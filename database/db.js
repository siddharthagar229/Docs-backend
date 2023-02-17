
import mongoose  from 'mongoose';

const Connection = async (username = 'usercode', password = 'codeforinterview') => {
    const URL = `mongodb+srv://${username}:${password}@google-docs-clone.nqa7qfh.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await
        mongoose.set("strictQuery", false);
         mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;