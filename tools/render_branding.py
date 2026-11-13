import argparse
import os
from pathlib import Path


os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

from PySide6.QtCore import QRectF
from PySide6.QtGui import QGuiApplication, QImage, QPainter
from PySide6.QtSvg import QSvgRenderer


ROOT = Path(__file__).resolve().parents[1]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Optional SVG rendering verification with PySide6")
    parser.parse_args()
    application = QGuiApplication([])
    sources = [
        (ROOT / "branding/albori-logo.svg", ROOT / "branding/albori-logo.png"),
        (ROOT / "sources/lomiri/qml/Wizard/Pages/data/albori-splash.svg", ROOT / "branding/albori-splash.png"),
    ]
    for source, destination in sources:
        renderer = QSvgRenderer(str(source))
        if not renderer.isValid():
            raise RuntimeError(f"Invalid SVG: {source}")
        bitmap = QImage(renderer.defaultSize(), QImage.Format_ARGB32)
        bitmap.fill(0)
        painter = QPainter(bitmap)
        renderer.render(painter, QRectF(bitmap.rect()))
        painter.end()
        if not bitmap.save(str(destination)):
            raise RuntimeError(f"Failed to save {destination}")
        print(f"Rendered: {destination.name}")
