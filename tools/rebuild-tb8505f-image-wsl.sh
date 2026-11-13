#!/usr/bin/env bash
# Ricompila le Impostazioni arm64 con prefisso /usr, ricompone e verifica
# l'immagine system per il TB-8505F. Da lanciare in WSL come utente normale
# (chiede la password sudo per montare l'immagine).
set -euo pipefail
project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_root"

shell_bin=sources/lomiri/.clickable/arm64/stage/usr/bin/lomiri
if [ ! -x "$shell_bin" ] || [ "${REBUILD_SHELL:-0}" = 1 ]; then
    echo "== Compilo la shell arm64 =="
    bash tools/build-shell-arm64-wsl.sh
fi

echo "== Compilo Impostazioni arm64 (prefisso /usr) =="
bash tools/build-settings-arm64-wsl.sh

echo "== Compongo l'immagine =="
sudo bash tools/compose-lenovo-image-wsl.sh

echo "== Verifico l'immagine =="
sudo bash tools/verify-albori-image-wsl.sh

echo
echo "Pronto. Da PowerShell, con il tablet in Fastboot Mode:"
echo '  fastboot flash system E:\workspace\albori-os\build\arm64\images\albori-os-tb8505f-prealpha.img'
echo '  fastboot reboot'
