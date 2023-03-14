import subprocess


def run(cmd):
    print("$ " + cmd)
    try:
        output = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT).decode("utf-8")
    except subprocess.CalledProcessError as e:
        output = e.output.decode("utf-8")
    print("  " + output)
    return output
