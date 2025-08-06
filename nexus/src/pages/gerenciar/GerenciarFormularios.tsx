import { useState } from 'react';
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
 * Área "droppable" com a aparência de um celular, que agora inclui a pré-visualização.
 */
const FormCanvas = ({ fields, mode, setMode }: { fields: FormField[], mode: 'editor' | 'preview', setMode: (mode: 'editor' | 'preview') => void }) => {
  const { setNodeRef } = useDroppable({
    id: 'form-canvas',
    disabled: mode !== 'editor', // Desabilita o drop na área de preview
  });

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    alert('Dados do formulário submetido: \n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex justify-center">
      {/* Frame do celular - As dimensões simulam uma tela de ~6 polegadas */}
      <div className="w-80 h-[600px] bg-gray-800 rounded-[40px] p-4 shadow-2xl">
        <div className="w-full h-full bg-gray-100 rounded-[24px] flex flex-col">
          {/* Notch/Câmera */}
          <div className="w-24 h-6 bg-gray-800 rounded-b-xl mx-auto"></div>
          
          {/* Alternador de Modo */}
          <div className="p-2 flex justify-center bg-gray-200 m-2 rounded-lg">
            <button onClick={() => setMode('editor')} className={`px-4 py-1 rounded-md text-sm font-medium ${mode === 'editor' ? 'bg-white shadow' : 'bg-transparent'}`}>Editar</button>
            <button onClick={() => setMode('preview')} className={`px-4 py-1 rounded-md text-sm font-medium ${mode === 'preview' ? 'bg-white shadow' : 'bg-transparent'}`}>Visualizar</button>
          </div>

          {/* Tela do celular (área de soltar ou preview) */}
          <div className="flex-grow p-2 overflow-y-auto">
            {mode === 'editor' ? (
              <div ref={setNodeRef} className="h-full">
                {fields.length === 0 ? (
                  <p className="text-gray-500 text-center mt-20 p-4">
                    Arraste os componentes para cá.
                  </p>
                ) : (
                  fields.map((field) => (
                    <div key={field.id} className="p-3 mb-2 bg-white border rounded-md shadow-sm">
                      <label className="font-bold">{field.label}</label>
                      <p className="text-sm text-gray-600">Tipo: {field.type}</p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                {fields.map((field) => (
                  <div key={field.id} className="mb-4">
                    <label className="block mb-1 font-medium text-sm">{field.label}</label>
                    {field.type === 'select' ? (
                      <select {...register(field.id)} className="w-full p-2 border rounded-md text-sm">
                        {field.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.id, { required: true })}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    )}
                  </div>
                ))}
                {fields.length > 0 && (
                    <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Enviar
                    </button>
                )}
              </form>
            )}
          </div>
          
          {/* Barra de navegação inferior */}
           <div className="w-32 h-1.5 bg-gray-400 rounded-full mx-auto my-3"></div>
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---

export default function GerenciarFormularios() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [mode, setMode] = useState<'editor' | 'preview'>('editor');

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && over.id === 'form-canvas') {
      const { type, label } = active.data.current || {};
      
      const newField: FormField = {
        id: nanoid(),
        type,
        label: `${label} (Novo)`,
        placeholder: `Digite o ${label.toLowerCase()}`,
        ...(type === 'select' && { options: ['Opção 1', 'Opção 2'] }),
      };

      setFields((currentFields) => [...currentFields, newField]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-8 font-sans bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Editor de Formulários Drag & Drop</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Paleta de Componentes */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Componentes</h2>
            {PALETTE_COMPONENTS.map((comp) => (
              <PaletteItem key={comp.type} type={comp.type} label={comp.label} />
            ))}
          </div>

          {/* Coluna 2: Canvas */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Área de Construção</h2>
            <FormCanvas fields={fields} mode={mode} setMode={setMode} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
