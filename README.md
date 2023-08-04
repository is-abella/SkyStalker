# Skystalker

A flight tracking website that leverages web scraping techniques to find the cheapest flights based on user inputs. Users can opt to track flight prices and receive email notifications whenever the price drops.

## Setup

1. Clone this repository.
    ```
    git clone https://github.com/chanjieru/sky-stalker.git
    ```
2. Navigate to the project directory.
    ```
    cd sky-stalker
    ```
3. Install the dependencies.
    ```
    npm install
    ```
4. Start the server.
    ```
    cd client
    npm run dev
    ```
    Open your web browser and visit http://localhost:5173/ to access the application.
5. In a separate terminal, start the backend server.
    ```
    cd api
    npm start
    ```

Note:

Server has to be kept running for email alerts to be sent at regular intervals.

Image credits:

Photo by <a href="https://unsplash.com/@muzammilo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Muzammil Soorma</a> on <a href="https://unsplash.com/s/photos/skyline?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
