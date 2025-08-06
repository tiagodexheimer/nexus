import { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  VStack,
  Input,
  Select,
  Textarea,
  Icon,
} from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import { FaGripVertical, FaTrash } from 'react-icons/fa';

// --- TIPOS ---
interface FormField {
  id: string;
  type: FieldType;
  label: string;
}

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'select';

// --- COMPONENTES DISPONÍVEIS PARA ARRASTAR ---
const AVAILABLE_FIELDS: Omit<FormField, 'id'>[] = [
  { type: 'text', label: 'Campo de Texto' },
  { type: 'textarea', label: 'Área de Texto' },
  { type: 'number', label: 'Campo Numérico' },
  { type: 'checkbox', label: 'Caixa de Seleção' },
  { type: 'select', label: 'Menu de Opções' },
];

// --- COMPONENTE PARA RENDERIZAR O CAMPO NO FORMULÁRIO ---
const RenderedFormField = ({ field, isPreview }: { field: FormField, isPreview?: boolean }) => {
  const commonProps = {
    isReadOnly: isPreview,
    placeholder: field.label,
  };

  switch (field.type) {
    case 'text':
      return <Input {...commonProps} />;
    case 'textarea':
      return <Textarea {...commonProps} />;
    case 'number':
      return <Input type="number" {...commonProps} />;
    case 'checkbox':
      return (
        <Checkbox isReadOnly={isPreview} colorScheme="green">
          {field.label}
        </Checkbox>
      );
    case 'select':
      return (
        <Select {...commonProps}>
          <option>Opção 1</option>
          <option>Opção 2</option>
        </Select>
      );
    default:
      return <Text>Campo desconhecido</Text>;
  }
};

// --- PÁGINA PRINCIPAL DO GERENCIADOR DE FORMULÁRIOS ---
const GerenciarFormularios = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const toast = useToast();

  const removeField = (idToRemove: string) => {
    setFormFields((prevFields) => prevFields.filter((field) => field.id !== idToRemove));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === 'toolbox' && destination.droppableId === 'phone-drop-area') {
      const fieldToAdd = AVAILABLE_FIELDS[source.index];
      const newField: FormField = {
        ...fieldToAdd,
        id: `field-${new Date().getTime()}`,
      };

      const newFields = Array.from(formFields);
      newFields.splice(destination.index, 0, newField);
      setFormFields(newFields);
    }

    if (source.droppableId === 'phone-drop-area' && destination.droppableId === 'phone-drop-area') {
        if (source.index === destination.index) return;

        const items = Array.from(formFields);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setFormFields(items);
    }
  };

  const handleSaveForm = () => {
    console.log('Formulário salvo:', formFields);
    toast({
      title: 'Formulário Salvo!',
      description: 'A estrutura do formulário foi salva com sucesso.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box p={5}>
        <Flex justify="space-between" align="center" mb={6}>
            <Heading as="h1" size="lg">
            Construtor de Formulários
            </Heading>
            <Button colorScheme="green" onClick={handleSaveForm} disabled={formFields.length === 0}>
                Salvar Formulário
            </Button>
        </Flex>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
          <Droppable droppableId="toolbox" isDropDisabled={true}>
            {(provided) => (
              <VStack
                ref={provided.innerRef}
                {...provided.droppableProps}
                w={{ base: '100%', lg: '300px' }}
                p={5}
                bg="gray.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                align="stretch"
                gap={4}
              >
                <Heading as="h3" size="md" textAlign="center" mb={2}>
                  Componentes
                </Heading>
                {AVAILABLE_FIELDS.map((field, index) => (
                  <Draggable key={field.type} draggableId={`toolbox-${field.type}`} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          p={4}
                          bg={snapshot.isDragging ? 'blue.100' : 'white'}
                          borderRadius="md"
                          boxShadow="sm"
                          border="1px solid"
                          borderColor="gray.200"
                          cursor="grab"
                          userSelect="none"
                        >
                          <Flex align="center">
                            <Icon as={FaGripVertical} mr={3} color="gray.400" />
                            <Text>{field.label}</Text>
                          </Flex>
                        </Box>
                        {snapshot.isDragging && (
                            <Box p={4} bg="blue.100" borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.200">
                                <Flex align="center">
                                    <Icon as={FaGripVertical} mr={3} color="gray.400" />
                                    <Text>{field.label}</Text>
                                </Flex>
                            </Box>
                        )}
                      </>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>

          <Flex flex={1} justify="center" align="center" p={5} bg="gray.100" borderRadius="lg">
            <Box
              w="375px"
              h="812px"
              bg="white"
              borderRadius="40px"
              boxShadow="0 10px 30px rgba(0,0,0,0.2)"
              border="8px solid black"
              overflow="hidden"
            >
              <Droppable droppableId="phone-drop-area">
                {(provided, snapshot) => (
                  <VStack
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    h="100%"
                    p={6}
                    bg={snapshot.isDraggingOver ? 'green.50' : 'white'}
                    transition="background-color 0.2s ease"
                    gap={4}
                    align="stretch"
                    overflowY="auto"
                  >
                    {formFields.length === 0 && !snapshot.isDraggingOver && (
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        h="100%"
                        textAlign="center"
                        color="gray.400"
                      >
                        <Text>Arraste os componentes aqui</Text>
                        <Text fontSize="sm">para montar seu formulário.</Text>
                      </Flex>
                    )}

                    {formFields.map((field, index) => (
                      <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            p={3}
                            bg={snapshot.isDragging ? 'blue.50' : 'white'}
                            borderRadius="md"
                            boxShadow="sm"
                            border="1px solid"
                            borderColor="gray.200"
                            position="relative"
                          >
                            <Flex align="center" justify="space-between">
                                <Box {...provided.dragHandleProps} cursor="grab" p={2}>
                                    <Icon as={FaGripVertical} color="gray.400" />
                                </Box>
                                <Box flex="1" mr={2}>
                                    <RenderedFormField field={field} isPreview />
                                </Box>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={() => removeField(field.id)}
                                >
                                    <Icon as={FaTrash} />
                                </Button>
                            </Flex>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </DragDropContext>
  );
};

export default GerenciarFormularios;