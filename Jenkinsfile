pipeline {
    agent any

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
            agent {
                docker { 
                    image 'registry.xsky.com/xsky/node-alpine-git'
                    label 'wizard'
                }
            }
            steps {
                sh './build.sh'
            }
        }
        stage('Delivery') {
            steps {
                sh './deliver.sh'
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}