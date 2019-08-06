#! /bin/zsh
echo "need install gitbook-cli? (y/n)"
read needGitbook

if test $needGitbook = "y"
then
    yarn global add gitbook-cli
fi
echo "need install packages? (y/n)"
read needPackages
if test $needPackages = "y"
then
    yarn install
    cd ./online-help-cn
    gitbook install
    cd ../online-help-en
    gitbook install
    cd ../
fi
node server/download.js
echo "Please enter the hostname default value is 10.255.101.184"
read Host
retHost=${Host:-"10.255.101.184"}
echo "Please enter the rootnam default value is /root"
read Host
retroot=${Host:-"/root"}

cd online-help-cn
gitbook build
scp -r ./_book root@$retHost:/$retroot
cd ../online-help-en
gitbook build ./ ./_book_en
scp -r ./_book_en root@$retHost:/$retroot