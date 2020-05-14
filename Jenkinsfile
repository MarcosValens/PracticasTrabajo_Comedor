pipeline {
  agent any
  stages {
    stage('Prepare enviroment') {
      steps {
        sh  '''
            echo "preparamos enviroment"
            npm install
            '''
      }
    }
    stage('Testing') {
        when {
            not {
                branch 'produccion'
            }
        }
        steps {
            sh  '''
                echo "Hacemos testing"
                npm run test
                '''
        }
    }
    stage('Compile') {
        when {
            anyOf {
                branch 'desarrollo';
                branch 'produccion'
            }
        }
        steps {
            sh  '''
                echo "Hacemos el package"
                npm run build
                '''
        }
    }
    stage('Build docker image') {
            when{
                branch 'produccion'
            }
            steps {
                sh  '''
                    echo "Contruimos la imagen docker"
                    cp -r ./dist/spa ./spa
                    docker build -t imagen-menjador .
                    '''
            }
    }

    stage('Upload image to registry'){
        when{
            branch 'produccion'
        }
        steps  {
            sh  '''
                echo "Subimos la imagen docker creada"
                ping -c 4 registry-back.esliceu.com
                ping -c 4 registry-back.esliceu.com:5000
                docker tag  imagen-menjador  http://registry-back.esliceu.com:5000/imagen-menjador
                docker push http://registry-back.esliceu.com:5000/imagen-menjador
                '''
        }
    }

    stage('Deploying on produccion'){
        when{
            branch 'produccion'
        }
        steps  {
        sh  '''
            echo "desplegamos"
            '''
        }
    }
  }
}
