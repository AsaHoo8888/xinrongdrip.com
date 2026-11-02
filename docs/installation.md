# 本地安装与验收

## 当前版本与已完成项

项目来自官方 website 模板提交 `ec351643011603cf75dc91db5d03f80ff120f1e9`，对应 Payload `4.0.0-beta.6`，属于预发布版本。全部 12 个模块保留。Node 要求 `>=24.22.1`；本机可用 `/opt/homebrew/opt/node/bin/node`（26.4.0），默认 PATH 中的 Node 22.22.3 不满足要求。

PostgreSQL 使用远程直连、`ssl: false`，连接池最多 5 个连接。已关闭 schema push 和自动创建数据库。初始迁移已生成，尚未执行。

联系表单预设包含姓名、邮箱、电话、公司、主题、国家／地区、留言；姓名、邮箱、电话、留言必填。配置脚本只创建缺失的表单和 `/contact` 页面，不修改已有页面，不清空任何集合。

## 启动前

1. 在本地 `.env` 填写新建专用空库的 `DATABASE_URL`。该文件已忽略提交且权限为 600；Payload、预览及 Cron 密钥已在本地生成。
2. 切换兼容 Node：`export PATH="/opt/homebrew/opt/node/bin:$PATH"`，然后检查 `node --version`。
3. 执行 `pnpm db:check`，核对目标库及已有表；发现已有业务表时先停止并检查，不运行初始迁移或重置。
4. 核对完成后执行 `pnpm payload migrate`，再执行 `pnpm setup:contact`。
5. 执行 `pnpm dev --hostname 127.0.0.1 --port 3000`。访问 `http://localhost:3000/admin` 创建首个管理员，联系页为 `http://localhost:3000/contact`。

模板原有的 demo seed 会清空集合并创建演示账号。本项目的初始化使用 `setup:contact`，安装过程未运行 demo seed。

## SMTP 与重试

在 `.env` 填写 `SMTP_HOST`、`SMTP_PORT`、`SMTP_TLS_MODE`、`SMTP_USER`、`SMTP_PASSWORD`、`SMTP_FROM_NAME`、`SMTP_FROM_ADDRESS`、`CONTACT_NOTIFY_TO`。`implicit` 为连接起始即 TLS（通常 465）；`starttls` 为强制升级 TLS（通常 587），按实际服务要求填写。账号及密码只保存在 `.env`。

未配置 SMTP 时不会创建测试邮箱或发送邮件。留言先提交数据库事务，再尝试通知；未发送显示“留言已保存，通知邮件待发送。”。后台打开提交记录，使用“重试通知邮件”按钮重试。通知状态与队列持久化在记录中，发送任务由数据库原子更新领取；发送中超过 10 分钟的任务允许手动重新领取。多个收件任务逐条完成后移出队列；SMTP 已接收但进程在落库前崩溃时仍可能出现重复邮件，属于至少一次发送语义。

实际外发测试前另行确认测试收件人。当前未执行邮件外发测试。

## 上传与提交保护

媒体只允许 JPEG、PNG、WebP、GIF，单文件最多 10 MiB。`public/media` 必须持久化；Compose 挂载宿主机 `./public/media` 到容器 `/home/node/app/public/media`。生产环境同样需持久卷及备份；本次未部署或验证容器。

提交端点为 `/api/form-submissions/submit`，原始集合不向访客开放写入和读取。服务端根据表单定义检查必填、字段名、重复字段、邮箱、数字、选择值及长度，普通字段最多 254 字符，留言最多 5000 字符，请求体最多 64 KiB。相同内容 5 分钟内拒绝重复提交，并有数据库唯一键防止同时重复写入。

基础限流每个地址每分钟最多 10 次。默认不信任代理头，所有匿名请求共享限流桶；仅在反向代理覆盖客户端传入的 `x-forwarded-for` 后将 `TRUST_PROXY=true`。限流为进程内实现，多实例部署前需共享限流存储。单实例重启会重置限流计数，数据库重复提交控制仍生效。

## 验收范围

本次实际结果：20 项单元与模拟端点测试通过，TypeScript 检查通过，ESLint 0 错误、13 条官方模板及生成文件告警；后台导入映射、类型和初始迁移均已生成。使用 webpack 的生产构建已完成编译及类型检查，在收集页面数据时因未配置 `DATABASE_URL` 停止，不能视为完整构建成功。未连接数据库、执行迁移、写入联系页或发送邮件，未启动可用站点。

`pnpm typecheck`、`pnpm test:unit`、`pnpm lint` 用于离线检查。Lint 对官方模板已有主题与卡片模式保留告警，未重构原有行为。完整 `pnpm build` 需要数据库可用，因为官方模板会预渲染文章、页面及站点地图。

待真实数据库就绪后验证：首次登录、模块增删改、匿名权限、草稿与发布、撤回及删除后的搜索索引、分类、媒体上传、联系页提交与后台记录、重试邮件、完整构建。当前没有产品模块、产品页或资料下载模块，搜索只覆盖文章。
