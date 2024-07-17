import BillboardClient from '@/components/billboard-client';
import { BillboardColumn } from '@/components/ui/table/columns-billboard';
import prisma from '@/lib/prismadb';
import { format } from 'date-fns';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className='flex flex-col '>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
