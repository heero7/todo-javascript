import React, { useState } from "react";
import { 
    Card,
    CardBody,
    Flex,
    Text,
    Spacer,
    Input,
    IconButton
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";

function TodoItem({ todoId, name, createdAt, completed, onCompleteClick, onEditTodoClick }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');

    const handleEditTodo = (event) => setEditValue(event.target.value);

    function editName() {
      if (editValue === name || editValue === '') {
        setIsEditing(false);
        return;
      }
      onEditTodoClick(todoId, editValue);
    }
    return (
        <>
          <Card maxW='lg' minW='md'>
            <CardBody>
              <Flex>
                {!isEditing && <Text onClick={() => setIsEditing(true)}>{name}</Text>}
                {isEditing && 
                  <>
                    <Input size='md' placeholder={name} onChange={handleEditTodo} />
                    <IconButton onClick={() => setIsEditing(false)} icon={<CloseIcon />} />
                    <IconButton onClick={() => editName()} icon={<EditIcon />} />
                  </>
                }
                <Spacer />
              {!isEditing && <IconButton onClick={onCompleteClick} icon={<CheckIcon />} />}
              </Flex>
              <Text fontSize='xs'>Created on {new Date(createdAt).toLocaleDateString()}</Text>
              <Text fontSize='xs'>Is Completed: {completed ? "✅" : "❌"}</Text>
            </CardBody>
          </Card>
        </>
    );
};

export default TodoItem;
