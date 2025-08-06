import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';
import { nanoid } from 'nanoid'; // Para gerar IDs únicos

// --- TIPOS E DADOS INICIAIS ---

// Define a estrutura de um campo do formulário
interface FormField {
  id: string;
  type: 'text' | 'email' | 'select';
  label: string;
  placeholder?: string;
  options?: string[];
}

// Componentes disponíveis na paleta para o usuário arrastar
const PALETTE_COMPONENTS = [
  {
    type: 'text' as const,
    label: 'Campo de Texto',
  },
  {
    type: 'email' as const,
    label: 'Campo de Email',
  },
  {
    type: 'select' as const,
    label: 'Caixa de Seleção',
  },
];

// --- COMPONENTES DO EDITOR ---

/**
 * 1. PALETA DE COMPONENTES
 * Itens que o usuário pode arrastar para o formulário.
 */
const PaletteItem = ({ type, label }: { type: string; label: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${type}`,
    data: { type, label }, // Passa os dados do componente
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 mb-2 bg-white border rounded-md shadow-sm cursor-grab active:cursor-grabbing"
    >
      {label}
    </div>
  );
};

/**
 * 2. CANVAS (ÁREA DE CONSTRUÇÃO)
 * Área "droppable" onde os campos do formulário são soltos e renderizados.
 */
const FormCanvas = ({ fields }: { fields: FormField[] }) => {
  const { setNodeRef } = useDroppable({
    id: 'form-canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className="p-4 bg-gray-100 border-2 border-dashed rounded-lg min-h-[400px] w-full"
    >
      {fields.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          Arraste os componentes da paleta para cá.
        </p>
      ) : (
        fields.map((field) => (
          <div key={field.id} className="p-3 mb-2 bg-white border rounded-md">
            <label className="font-bold">{field.label}</label>
            <p className="text-sm text-gray-600">Tipo: {field.type}</p>
          </div>
        ))
      )}
    </div>
  );
};

/**
 * 3. RENDERIZADOR DO FORMULÁRIO DINÂMICO
 * Pega a estrutura JSON (o estado `fields`) e renderiza um formulário real com React Hook Form.
 */
const DynamicFormRenderer = ({ fields }: { fields: FormField[] }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert('Dados do formulário submetido: \n' + JSON.stringify(data, null, 2));
  };

  if (fields.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Pré-visualização do Formulário</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-lg bg-white">
        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-1 font-medium">{field.label}</label>
            {field.type === 'select' ? (
              <select {...register(field.id)} className="w-full p-2 border rounded-md">
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id, { required: true })}
                className="w-full p-2 border rounded-md"
              />
            )}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Enviar Formulário
        </button>
      </form>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---

export default function GerenciarFormularios() {
  // Estado central que armazena a estrutura do formulário
  const [fields, setFields] = useState<FormField[]>([]);

  // Lógica principal do Drag and Drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    // Verifica se o componente foi solto no canvas
    if (over && over.id === 'form-canvas') {
      const { type, label } = active.data.current || {};
      
      // Cria um novo campo com um ID único
      const newField: FormField = {
        id: nanoid(),
        type,
        label: `${label} (Novo)`,
        placeholder: `Digite o ${label.toLowerCase()}`,
        ...(type === 'select' && { options: ['Opção 1', 'Opção 2'] }),
      };

      // Adiciona o novo campo ao estado
      setFields((currentFields) => [...currentFields, newField]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-8 font-sans bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Editor de Formulários Drag & Drop</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Paleta de Componentes */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Componentes</h2>
            {PALETTE_COMPONENTS.map((comp) => (
              <PaletteItem key={comp.type} type={comp.type} label={comp.label} />
            ))}
          </div>

          {/* Coluna 2: Canvas e Pré-visualização */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Área de Construção</h2>
            <FormCanvas fields={fields} />
            <DynamicFormRenderer fields={fields} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
