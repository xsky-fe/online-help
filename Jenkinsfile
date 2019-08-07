pipeline {
    agent { node { label 'wizard' } }

    stages {
        stage('Prepare') {
            steps {
                script {
                    refName = ""
                    if (env.GIT_TAG_NAME) {
                        refName = env.GIT_TAG_NAME
                    } else {
                        refName = env.BRANCH_NAME
                    }
                    refName = refName.replace('/', '_').trim()
                    if (refName.length() == 0) {
                        echo "invalid refName: $refName"
                        sh "exit 1"
                        return
                    }
                    env.REF_NAME = refName
                }
            }
        }
        stage('Build') {
            steps {
                sh 'docker build --network="host" -t wizard-online-help . && docker tag wizard-online-help registry.xsky.com/xsky/wizard-online-help && docker push registry.xsky.com/xsky/wizard-online-help'
            }
        }
        stage('Delivery') {
            steps {
                sh 'chmod +x deliver.sh && ./deliver.sh'
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}