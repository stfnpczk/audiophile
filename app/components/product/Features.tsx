import type { IncludedItem } from '@/app/types/product';

type FeaturesProps = {
  features: string;
  includes: IncludedItem[];
};

export function Features({ features, includes }: FeaturesProps) {
  return (
    <div className='flex flex-col gap-22 py-22 lg:flex-row lg:gap-32'>
      {/* Features Section */}
      <div className='flex-1'>
        <h2 className='mb-6 text-2xl font-bold tracking-wider uppercase md:text-3xl'>
          Features
        </h2>
        <p className='whitespace-pre-line text-black opacity-50 lg:text-[15px]/6.25'>
          {features}
        </p>
      </div>

      {/* In the Box Section */}
      <div className='flex-1 md:grid md:grid-cols-2 lg:flex lg:max-w-md lg:flex-col'>
        <h2 className='mb-6 text-2xl font-bold tracking-wider uppercase md:text-3xl'>
          In the Box
        </h2>
        <ul className='space-y-2'>
          {includes.map((item, index) => (
            <li
              key={`${item.item}-${item.quantity}-${index}`}
              className='flex gap-6 text-[15px]/[25px] md:text-base'
            >
              <span className='font-bold text-orange'>{item.quantity}x</span>
              <span className='opacity-50'>{item.item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
