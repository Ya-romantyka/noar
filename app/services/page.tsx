import React from 'react';
import { headers } from 'next/headers';
import { getDeviceInfo } from '@/app/hooks/useDevice';
import ServiceHero from '@/app/services/service-hero/service-hero';
import ServiceTable from '@/app/services/service-table/service-table';

const Page = async () => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const device = getDeviceInfo(userAgent);

  return (
    <div>
      <ServiceHero device={device} />
      <ServiceTable />
    </div>
  );
};

export default Page;
