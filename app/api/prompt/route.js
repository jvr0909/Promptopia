import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(prompts), {status: 200});

    } catch (error) {
        console.log("Error from GET /api/prompt: ", error);
        return new Response("Failed to get prompts!", {status: 500});
            
    }
}