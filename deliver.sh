
#!/bin/bash 
set -e

remoteDir="/home/gitbuilder/gitbuilder.ceph.com/xsky-wizard-online-help/$REF_NAME"

ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no gitbuilder@gitbuilder.xsky.com "mkdir -p $remoteDir"
scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no build/* gitbuilder@gitbuilder.xsky.com:$remoteDir/