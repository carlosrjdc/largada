const fs = require('fs')
const { google } = require('googleapis')
require("dotenv").config();


const GOOGLE_API_FOLDER_ID = process.env.GOOGLE_API_FOLDER_ID

async function uploadFile(nomeArquivo, nomefinal){

    //redirect URL
    const REDIRECT_URI = process.env.REDIRECT_URI;

    //refresh token
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try{
        //"": "","": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqphOPV5h6QzDQ\nirpqY+pjdXY+l6jc6QGCKDLJAnP/xUwitevMDbIjfs6qw4uiQS8BDHgZkbaanFyh\n/vIzG8H12afA0KQTU+XjKOGG+rQqJob1lFBuYjkSnjNQPUlnxyii+fhCGzvG8MV/\nQBy5vz+Blqxx31BcFOCExnbs+YX6Z7jshK0mPmszkmo9w1Gtsj2wY8BNU1eUbsgZ\nT8q5MQkrUvVhC+ABOTsUVtyszizH2zzX784ojT8TKVvvEV/FfDf8mo9lhytZV/BF\nOKklkO70PijybjnfRDYyIRVk4MkuGFcScUwmRQSED0LmHfHG1ULIdaY286rcX0kk\n1saI/y3fAgMBAAECggEAAc6camotDS5k9/BgJPxF4SO/Ss5kVWKKR4yRbRt/ivfV\n5JA0nQaQGlwfaCOF+QPjsYkmRG8MlfqN6JFAk1X56daSNjJ/akz7JDqsmLdS7RdX\nWoZli6WyoQXX2UOs4VJ0lbU78cdEDMlD7iMJqtXhoEeuL86DlVYLQpyvabcCujIW\nh7S9oKHvxzNvLh8f8LgU9geIjKM+si252aWLiry9jE6nKAoEyoF+bsL0KpbUXluE\nDq1t+fsx62HeGKhICe4s7wAZSEZwaACWQAMb7UFmm4nJ7mpqkeVv5J4brMJ9SLWF\nnQyfRqLZTX/rpy+jqFThool2ls8DyycY9SadqzXlwQKBgQDr3GYC4qR5dMuKPzZo\nbAClgIrzylHgZ1WGhA2f7EW7U5SN/5w0uZ/Ga/Rzppt5e81v77WvvheuW3zzEYLP\nfk/rtr7Shg8I/rBMZUOWulnquPLIEZKR7d9lGlMlWRlHX9ASB5QIEnQABwbNGGTG\nGVxPZ72r/Nas+U4jyxHl3OFSMQKBgQC5ODo1MVF+PHw4sDx5LQdKro7PZk8s4Dd+\nT2UkDnmVwYl7yEm8ytBw3/ExH6bpc+9mScywtUcfoOG4WVwjwBXYv/HEHM4zKNvt\nbdeVmq3YW5v9NNVj9Fedbh77h6k+Om9AZ7vydeQ4vYEGu4phi1ZJ6Mw4GQ99dNAu\n2Y64KPTtDwKBgHorDQPNlVf78TnIiEwKNUOEk3S3hTVxENG+MLh3T586KaZrkeOV\ninbikBofYETKpZynUzqWgfmkFdJpbZJAYPE9FRZCriMAmRzZDutR1yVHaynKQFsq\nFR5vRkYAIqHftQzBtCGCPWeOPC2bxwb9N91BZPNi4WdzMtBDbR/dCzDhAoGBAJFr\n2w+udBxX4vQjMqe1Oddh7BBcdGd4dzl9npxLnRx+QrJkE7jdyAAHY3g9MLB0bQ7z\nfHl1Kq1jhDVYO6Z6Bu0R7wEZ2K+EMgBdUHlOY5XOf0+zLqN20V9yeXLlFXUdLgH0\nMDVyaEhASVB+6GwjmREYbVbSHj5S+6z89TgUOBDzAoGAN4TfdMQe3k3+F8QRCM4o\n+EBEQiQ1Ol2o/ba7+EmVcXWcRyr22cW6kdPoE9iSSealgsGMpLKJf1nYJ/V6YDo5\nnhwJ7Ek5yS8NhFHjKXILiIxo3OsBZ6BuRVjC0L3a28VaG/fsmfQFXeKMnDib5g+P\nJBQfUgJL/+RiZKpD0QJTn5I=\n-----END PRIVATE KEY-----\n","client_email": "gogoeldrive@empresa-379616.iam.gserviceaccount.com","client_id": "108373480730334349275","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token","auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/gogoeldrive%40empresa-379616.iam.gserviceaccount.com"

        //console.log(JSON.parse(JSON.stringify(dados)))

        const auth = new google.auth.GoogleAuth({
        
            
            //keyFile: `type: service_account, project_id:empresa-379616,private_key_id:25e45baf23fa44a1ea3f1e10e08a6cd902100226,private_key:-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqphOPV5h6QzDQ\nirpqY+pjdXY+l6jc6QGCKDLJAnP/xUwitevMDbIjfs6qw4uiQS8BDHgZkbaanFyh\n/vIzG8H12afA0KQTU+XjKOGG+rQqJob1lFBuYjkSnjNQPUlnxyii+fhCGzvG8MV/\nQBy5vz+Blqxx31BcFOCExnbs+YX6Z7jshK0mPmszkmo9w1Gtsj2wY8BNU1eUbsgZ\nT8q5MQkrUvVhC+ABOTsUVtyszizH2zzX784ojT8TKVvvEV/FfDf8mo9lhytZV/BF\nOKklkO70PijybjnfRDYyIRVk4MkuGFcScUwmRQSED0LmHfHG1ULIdaY286rcX0kk\n1saI/y3fAgMBAAECggEAAc6camotDS5k9/BgJPxF4SO/Ss5kVWKKR4yRbRt/ivfV\n5JA0nQaQGlwfaCOF+QPjsYkmRG8MlfqN6JFAk1X56daSNjJ/akz7JDqsmLdS7RdX\nWoZli6WyoQXX2UOs4VJ0lbU78cdEDMlD7iMJqtXhoEeuL86DlVYLQpyvabcCujIW\nh7S9oKHvxzNvLh8f8LgU9geIjKM+si252aWLiry9jE6nKAoEyoF+bsL0KpbUXluE\nDq1t+fsx62HeGKhICe4s7wAZSEZwaACWQAMb7UFmm4nJ7mpqkeVv5J4brMJ9SLWF\nnQyfRqLZTX/rpy+jqFThool2ls8DyycY9SadqzXlwQKBgQDr3GYC4qR5dMuKPzZo\nbAClgIrzylHgZ1WGhA2f7EW7U5SN/5w0uZ/Ga/Rzppt5e81v77WvvheuW3zzEYLP\nfk/rtr7Shg8I/rBMZUOWulnquPLIEZKR7d9lGlMlWRlHX9ASB5QIEnQABwbNGGTG\nGVxPZ72r/Nas+U4jyxHl3OFSMQKBgQC5ODo1MVF+PHw4sDx5LQdKro7PZk8s4Dd+\nT2UkDnmVwYl7yEm8ytBw3/ExH6bpc+9mScywtUcfoOG4WVwjwBXYv/HEHM4zKNvt\nbdeVmq3YW5v9NNVj9Fedbh77h6k+Om9AZ7vydeQ4vYEGu4phi1ZJ6Mw4GQ99dNAu\n2Y64KPTtDwKBgHorDQPNlVf78TnIiEwKNUOEk3S3hTVxENG+MLh3T586KaZrkeOV\ninbikBofYETKpZynUzqWgfmkFdJpbZJAYPE9FRZCriMAmRzZDutR1yVHaynKQFsq\nFR5vRkYAIqHftQzBtCGCPWeOPC2bxwb9N91BZPNi4WdzMtBDbR/dCzDhAoGBAJFr\n2w+udBxX4vQjMqe1Oddh7BBcdGd4dzl9npxLnRx+QrJkE7jdyAAHY3g9MLB0bQ7z\nfHl1Kq1jhDVYO6Z6Bu0R7wEZ2K+EMgBdUHlOY5XOf0+zLqN20V9yeXLlFXUdLgH0\nMDVyaEhASVB+6GwjmREYbVbSHj5S+6z89TgUOBDzAoGAN4TfdMQe3k3+F8QRCM4o\n+EBEQiQ1Ol2o/ba7+EmVcXWcRyr22cW6kdPoE9iSSealgsGMpLKJf1nYJ/V6YDo5\nnhwJ7Ek5yS8NhFHjKXILiIxo3OsBZ6BuRVjC0L3a28VaG/fsmfQFXeKMnDib5g+P\nJBQfUgJL/+RiZKpD0QJTn5I=\n-----END PRIVATE KEY-----\n, client_email:gogoeldrive@empresa-379616.iam.gserviceaccount.com,client_id:108373480730334349275,auth_uri:https://accounts.google.com/o/oauth2/auth,token_uri:https://oauth2.googleapis.com/token, auth_provider_x509_cert_url:https://www.googleapis.com/oauth2/v1/certs,client_x509_cert_url:https://www.googleapis.com/robot/v1/metadata/x509/gogoeldrive%40empresa-379616.iam.gserviceaccount.com`,          
            scopes: ['https://www.googleapis.com/auth/drive'],
            
        })



        const driveService = google.drive({
            version: 'v3',
            auth: oauth2Client
            
        })

        const fileMetaData = {
            'name': nomefinal + ".xlsx",
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            body:nomeArquivo
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        return response.data.id

    }catch(err){
        console.log('Upload file error', err)
    }
}


module.exports = uploadFile
/*uploadFile().then(data => {
    console.log(data)
    //https://drive.google.com/uc?export=view&id=
})*/