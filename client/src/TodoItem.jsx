import React from "react";
import { 
    Card,
    Stack,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Text,
    Spinner,
    Button } from "@chakra-ui/react";

function TodoItem({ name, description }) {
    return (
        <div>
            <Card overflow='hidden' variant='outline' direction={{ base: 'column', sm: 'row'}}>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={`https://picsum.photos/200?random=${Math.random()}`} 
                    fallback={<Spinner size='xl' />} />
                
                <Stack>
                    <CardBody>
                        <Heading size='md'>{name}</Heading>
                        <Text py="2">{description}</Text>
                    </CardBody>

                    <CardFooter>
                        <Button>Complete</Button>
                    </CardFooter>
                </Stack>
            </Card>
        </div>
    );
};

export default TodoItem;
