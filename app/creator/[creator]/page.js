
import Creatorpage from '@/components/Creator';
import React from 'react';
import { fetchUserEmail } from '@/app/actions/useractions';

const Creator = async ({params }) => {
    
    let username = params.creator
    let userEmail = await fetchUserEmail(username);
  
  
  return (
    <>
      <Creatorpage username={params.creator} email={userEmail} />
    </>
  );
};

export default Creator;

export async function generateMetadata({params}) {
  return {
    title : `${params.creator} - CrowdLaunch!!!`
  }
}