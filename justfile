default:
  @just --list --unsorted

# explain package
explain package:
  npm explain {{package}}
