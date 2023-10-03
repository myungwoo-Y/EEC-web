'use client';

import CertificationTable from '@/components/certification/CertificationTable';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetUserCertificationsQuery } from '@/services/user';
import React from 'react';
import { useSelector } from 'react-redux';

function CertificationPage() {
  const user = useSelector(selectCurrentUser);
  const { data: certifications } = useGetUserCertificationsQuery(user?.userId || 0, {
    skip: !user
  });

  return (
    <div className="py-5 lg:py-10 px-3 lg:px-12 overflow-x-auto">
      <CertificationTable certifications={certifications || []} user={user} />
    </div>
  );
}

export default CertificationPage;
