import subprocess
import os

repo_dir = r'c:\yared-projects\smart-iot-environmental-monitor'
os.chdir(repo_dir)

def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(">", cmd)
    if result.stdout:
        print(result.stdout.strip())

run_cmd('git config user.name "yaya2127"')
run_cmd('git config user.email "kinetibebyared@gmail.com"')

run_cmd("git add web/index.html web/style.css web/app.js")
run_cmd('git commit -m "feat(ui): upgrade IoT Telemetry Dashboard to Industrial Cyber-Amber theme with SVG circular gauges and real-time Canvas line chart" --allow-empty')

print("\nCommitted Industrial Cyber-Amber Telemetry UI upgrade!")
