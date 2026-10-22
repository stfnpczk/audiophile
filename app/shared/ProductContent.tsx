import { formatProductName } from '@/app/utils/formatProductName';

interface ProductContentProps {
  name: string;
  category: string;
  description?: string;
  isNew?: boolean;
  alignment?: 'center' | 'left';
  maxWidth?: string;
  as?: 'h1' | 'h2';
}

export function ProductContent({
  name,
  category,
  description,
  isNew = false,
  alignment = 'center',
  maxWidth,
  as: Heading = 'h2',
}: ProductContentProps) {
  const { name: formattedName, category: formattedCategory } =
    formatProductName(name, category);

  const containerClasses =
    alignment === 'center'
      ? 'text-center md:mx-auto md:w-full md:max-w-150 lg:mx-0 lg:text-left'
      : 'text-left';

  return (
    <div className={containerClasses}>
      {isNew && (
        <small className='mb-4 block text-sm/6 tracking-[10px] text-orange uppercase'>
          New Product
        </small>
      )}
      <Heading className='mb-6 text-3xl font-bold tracking-[1px] uppercase lg:text-[40px]/11 lg:tracking-[1.43px]'>
        {formattedName}
        <br />
        {formattedCategory}
      </Heading>
      {description && (
        <p
          className={`mb-8 text-black/50 lg:text-[15px]/6.25 ${maxWidth ? maxWidth : 'lg:max-w-108.75'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
