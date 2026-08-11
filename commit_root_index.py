import subprocess
import os

repo_dir = r'c:\yared-projects\smart-iot-environmental-monitor'
os.chdir(repo_dir)

subprocess.run(['git', 'config', 'user.name', 'yaya2127'])
subprocess.run(['git', 'config', 'user.email', 'kinetibebyared@gmail.com'])
subprocess.run(['git', 'add', 'index.html'])
subprocess.run(['git', 'commit', '-m', 'feat: add root index.html for direct GitHub Pages live dashboard hosting', '--allow-empty'])
print('Committed root index.html!')
