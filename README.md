# WEMU testing deployment

Live app: https://imedqq.github.io/wemu-test/rooms

This repository holds the GitHub Pages deployment workflow and versioned browser-build releases. It is not the application source repository.

- Application source and Render backend: https://github.com/imedqq/wemu (private).
- Frontend builds: https://github.com/imedqq/wemu-test/releases.
- Deployment history: https://github.com/imedqq/wemu-test/actions/workflows/deploy-wemu.yml.

To deploy or roll back, run **Deploy WEMU testing site** with an explicit release tag. The workflow downloads `wemu-web.tar.gz` and its SHA-256 checksum from that release, verifies it, and publishes the extracted directory through the GitHub Pages artifact API. It does not read site files from the repository checkout.

Do not commit generated HTML, JavaScript bundles, emulator binaries, ROMs, BIOS files, or local runtime configuration here. Build and package the frontend from the source repository. Required runtime assets and license notices belong in the release artifact; applicable corresponding source and license obligations must also be fulfilled.

Old committed site bundles were removed after switching to artifact deployment. They remain in Git history; existing releases remain available for rollback. This cleanup does not rewrite history or reduce historical clone size.
