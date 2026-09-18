#!/usr/bin/env python3
"""Atalho para o orquestrador em deploy/iac.py."""

from pathlib import Path
import runpy


runpy.run_path(str(Path(__file__).resolve().parent / "deploy" / "iac.py"), run_name="__main__")
