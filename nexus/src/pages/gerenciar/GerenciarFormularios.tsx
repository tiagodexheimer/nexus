import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { nanoid } from 'nanoid';

// --- ÍCONES ---
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.71c-1.12 0-2.033.954-2.033 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const DragHandleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.5 0V3.75A.75.75 0 0 1 10 3ZM5.75 5.75a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm0 5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" clipRule="evenodd" />
    </svg>
);

const PlusCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-gray-800">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


// --- TIPOS E DADOS INICIAIS ---

interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'checkbox' | 'multiselect';
  label: string;
  placeholder?: string;
  options?: string[];
}

const PALETTE_COMPONENTS = [
  { type: 'text' as const, label: 'Campo de Texto' },
  { type: 'email' as const, label: 'Campo de Email' },
  { type: 'select' as const, label: 'Caixa de Seleção' },
  { type: 'checkbox' as const, label: 'Checkbox' },
  { type: 'multiselect' as const, label: 'Seleção Múltipla' },
];

// --- COMPONENTES DO EDITOR ---

const PaletteItem = ({ type, label, onAdd }: { type: string; label: string; onAdd: () => void; }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${type}`,
    data: { type, label },
  });

  return (
    <div ref={setNodeRef} className="p-2 mb-2 bg-white border rounded-md shadow-sm flex items-center justify-between">
      <div {...listeners} {...attributes} className="flex-grow p-2 cursor-grab active:cursor-grabbing">
        {label}
      </div>
      <button onClick={onAdd} className="p-1 rounded-full hover:bg-gray-100" title="Adicionar ao formulário">
        <PlusCircleIcon />
      </button>
    </div>
  );
};

// Componente visual puro para o campo (usado no DragOverlay)
const FieldItem = ({ label, type }: { label: string, type: string }) => {
    return (
        <div className="p-3 bg-white border rounded-md shadow-lg">
            <label className="font-bold">{label}</label>
            <p className="text-sm text-gray-600">Tipo: {type}</p>
        </div>
    );
};

const renderPreviewField = (field: FormField, register: any) => {
    switch (field.type) {
        case 'select':
            return <select {...register(field.id)} className="w-full p-2 border rounded-md text-sm"><option value="">Selecione</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
        case 'multiselect':
            return <select {...register(field.id)} multiple className="w-full p-2 border rounded-md text-sm h-24">{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
        case 'checkbox':
             return <div className="flex items-center"><input id={field.id} type="checkbox" {...register(field.id)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><label htmlFor={field.id} className="ml-2 block text-sm text-gray-900">{field.label}</label></div>
        default:
            return <input type={field.type} placeholder={field.placeholder} {...register(field.id, { required: true })} className="w-full p-2 border rounded-md text-sm" />;
    }
}

// Componente para um item ordenável no canvas, agora com a visualização real
const SortablePreviewField = ({ field, register }: { field: FormField, register: any }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center mb-4 bg-white p-2 rounded-lg border">
            <div {...attributes} {...listeners} className="cursor-grab touch-none p-2">
                <DragHandleIcon />
            </div>
            <div className="flex-grow">
                {field.type !== 'checkbox' && <label className="block mb-1 font-medium text-sm">{field.label}</label>}
                {renderPreviewField(field, register)}
            </div>
        </div>
    );
};

const FormCanvas = ({ fields, isDraggingPaletteItem }: { fields: FormField[], isDraggingPaletteItem: boolean }) => {
  const { setNodeRef } = useDroppable({ id: 'form-canvas' });
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    alert('Dados do formulário submetido: \n' + JSON.stringify(data, null, 2));
  };

  const dropZoneStyle = `h-full rounded-lg transition-colors ${isDraggingPaletteItem ? 'border-2 border-dashed border-blue-500 bg-blue-50' : ''}`;

  return (
    <div className="flex justify-center">
      <div className="w-80 h-[600px] bg-gray-800 rounded-[40px] p-4 shadow-2xl">
        <div className="w-full h-full bg-gray-100 rounded-[24px] flex flex-col">
          <div className="w-24 h-6 bg-gray-800 rounded-b-xl mx-auto"></div>
          <div className="flex-grow p-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <form ref={setNodeRef} onSubmit={handleSubmit(onSubmit)} className={dropZoneStyle}>
              <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                {fields.length > 0 
                    ? fields.map((field) => <SortablePreviewField key={field.id} field={field} register={register} />)
                    : <div className="h-full flex items-center justify-center"><p className="text-gray-500 text-center p-4">Arraste os componentes para cá ou clique no '+' para adicionar.</p></div>
                }
              </SortableContext>
              {fields.length > 0 && <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">Enviar</button>}
            </form>
          </div>
          <div className="w-32 h-1.5 bg-gray-400 rounded-full mx-auto my-3"></div>
        </div>
      </div>
    </div>
  );
};

const DeleteArea = () => {
    const { setNodeRef, isOver } = useDroppable({ id: 'delete-area' });
    const style = {
        transition: 'background-color 0.2s ease',
        backgroundColor: isOver ? 'rgb(239 68 68 / 0.3)' : 'transparent',
        borderColor: isOver ? 'rgb(239 68 68)' : 'rgb(209 213 219)',
        color: isOver ? 'rgb(239 68 68)' : 'rgb(107 114 128)',
    };
    return (
        <div ref={setNodeRef} style={style} className="flex flex-col items-center justify-center mt-8 p-4 border-2 border-dashed rounded-lg">
            <TrashIcon />
            <p className="mt-2 text-sm">Arraste aqui para apagar</p>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

export default function GerenciarFormularios() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDraggingPaletteItem, setIsDraggingPaletteItem] = useState(false);

  const handleAddItem = (type: FormField['type'], label: string) => {
    const newField: FormField = {
      id: nanoid(),
      type,
      label: `${label}`,
      placeholder: `Digite o ${label.toLowerCase()}`,
      ...((type === 'select' || type === 'multiselect') && { options: ['Opção 1', 'Opção 2', 'Opção 3'] }),
    };
    setFields((currentFields) => [...currentFields, newField]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    if (String(event.active.id).startsWith('palette-')) {
        setIsDraggingPaletteItem(true);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setIsDraggingPaletteItem(false);

    if (!over) return;

    if (over.id === 'delete-area' && fields.some(f => f.id === active.id)) {
        setFields((currentFields) => currentFields.filter((field) => field.id !== active.id));
        return;
    }
    
    // Adicionar novo campo da paleta
    if (active.id.startsWith('palette-')) {
        const { type, label } = active.data.current || {};
        const newField: FormField = {
            id: nanoid(),
            type,
            label: `${label}`,
            placeholder: `Digite o ${label.toLowerCase()}`,
            ...((type === 'select' || type === 'multiselect') && { options: ['Opção 1', 'Opção 2', 'Opção 3'] }),
        };

        const overIndex = fields.findIndex((f) => f.id === over.id);

        if (overIndex !== -1) {
            // Soltou sobre um item existente, insere na posição
            setFields((currentFields) => {
                const newFields = [...currentFields];
                newFields.splice(overIndex, 0, newField);
                return newFields;
            });
        } else {
            // Soltou no canvas vazio ou em outro lugar, adiciona no final
            setFields((currentFields) => [...currentFields, newField]);
        }
        return;
    }
    
    // Reordenar campos existentes
    const activeId = active.id;
    const overId = over.id;
    if (activeId !== overId) {
        const oldIndex = fields.findIndex((field) => field.id === activeId);
        const newIndex = fields.findIndex((field) => field.id === overId);

        if (oldIndex > -1 && newIndex > -1) {
            setFields((items) => arrayMove(items, oldIndex, newIndex));
        }
    }
  };

  const handleSaveConfiguration = () => {
    if (fields.length === 0) {
      alert("O formulário está vazio. Adicione campos antes de salvar.");
      return;
    }
    const jsonConfig = JSON.stringify(fields, null, 2);
    alert("Configuração do Formulário (JSON):\n\n" + jsonConfig);
    console.log(jsonConfig); // Loga no console para facilitar a cópia
  };

  const activeField = fields.find(f => f.id === activeId);
  const activePaletteItem = PALETTE_COMPONENTS.find(p => `palette-${p.type}` === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="p-8 font-sans bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Editor de Formulários Drag & Drop</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Componentes</h2>
            {PALETTE_COMPONENTS.map((comp) => (
              <PaletteItem 
                key={comp.type} 
                type={comp.type} 
                label={comp.label}
                onAdd={() => handleAddItem(comp.type, comp.label)} 
              />
            ))}
            <DeleteArea />
            <button
              onClick={handleSaveConfiguration}
              className="w-full mt-4 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Salvar Configuração
            </button>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Área de Construção</h2>
            <FormCanvas fields={fields} isDraggingPaletteItem={isDraggingPaletteItem} />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          activeField ? (
            <FieldItem label={activeField.label} type={activeField.type} />
          ) : activePaletteItem ? (
            <div className="p-4 mb-2 bg-white border rounded-md shadow-lg cursor-grabbing">
                {activePaletteItem.label}
            </div>
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
