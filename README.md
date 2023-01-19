## Usage

    cd be_assignment
    npm install or npm i
    cp .env.example .env // for ubuntu, mac, linux
    create .env file and copy content of .env.example to connect to mongodb // for Windows
    npm start

## API Swagger Documentation

run command :: npm run swagger :: this command will create swagger.json file if not present for swagger documentation.

http://localhost:{{PORT || 3000}}/api-docs

## API Endpoints

POST Shorten URLs (/short) :: All URLs entered into the application will be sent to this endpoint as payload, where they will be validated using the isValid helper function.Finally, our database stores both the entered URL and the short Id for the entered URL.

GET Redirect (/:shortId) :: With the help of this endpoint, we can switch from the short ID stored in our database to the long or original URL.

