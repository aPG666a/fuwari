# PGの小站运维说明

## 正式环境

- 站点：`https://blog.likeai520.cc`
- 静态根目录：`/var/www/fuwari/current`
- Release 目录：`/var/www/fuwari/releases/<commit-sha>`
- 部署用户：`fuwari-deploy`（无 sudo 权限）
- 自动发布：推送到 `main` 后由 GitHub Actions 构建并原子切换 `current`
- 保留策略：最近三个 release

GitHub Actions 使用以下仓库 Secrets：

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_SSH_KEY`
- `DEPLOY_KNOWN_HOSTS`

## 回滚

在服务器上列出可用版本：

```sh
find /var/www/fuwari/releases -mindepth 1 -maxdepth 1 -type d -printf '%T@ %f\n' | sort -nr
```

确认目标目录包含 `index.html` 后切换软链接：

```sh
ln -sfn /var/www/fuwari/releases/<commit-sha> /var/www/fuwari/current.next
mv -Tf /var/www/fuwari/current.next /var/www/fuwari/current
```

Caddy 直接读取软链接，无需重启。

## Sveltia CMS OAuth

官方认证器位于服务器的 `/opt/sveltia-cms-auth`，已安装依赖，并设置：

```toml
[vars]
ALLOWED_DOMAINS = "blog.likeai520.cc"
```

完成以下外部授权后即可启用：

1. 登录 Cloudflare Wrangler 并部署 Worker。
2. 为 `auth.blog.likeai520.cc` 配置 Worker 自定义域名，或将 `public/admin/config.yml` 的 `base_url` 改为实际 `workers.dev` 地址。
3. 在 GitHub 创建 OAuth App，回调地址使用认证器地址加 `/callback`。
4. 将 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET` 写入 Worker Secret/变量。

CMS 的 GitHub 后端固定为 `aPG666a/fuwari` 的 `main` 分支，且只启用 OAuth 登录。

## Giscus 与统计

仓库 Discussions 已启用。创建 `Blog Comments` 分类并安装 Giscus App 后，把仓库 ID、分类 ID 写入 `src/data/site.json`，再将 `enabled` 设为 `true`。

Cloudflare Web Analytics 的 Beacon Token 只写入 `src/data/site.json` 的 `analytics.cloudflareBeaconToken`。不要提交 Cloudflare API Token、GitHub OAuth Secret 或其他账户凭据。
