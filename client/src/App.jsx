import React from "react";
import Title from "./Title";
import { ChakraProvider } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

const dummyData = [
    {
        name: "Dishes",
        description: "Make sure to also use the dishwasher"
    },
    {
        name: "Workout",
        description: "Part 2 of the Ironman"
    },
    {
        name: "Stretch",
        description: "After workout out, hit the muscles hit."
    }
];

function App() {
    return (
        <ChakraProvider>
            <div>
                <Title />
                {dummyData.map(({ name, description }, index) => <TodoItem key={index} name={name} description={description} />)}
            </div>
        </ChakraProvider>
    );
}

export default App;
