import { useNavigate } from 'react-router-dom';

import { PlayIcon } from 'lucide-react';

import { Card } from '../../components/Card';
import { type Production } from '../../contexts/production/production.type';
import { useProduction } from '../../hooks/useProduction';

export const Productions = () => {
  const { productions, selectProduction } = useProduction();
  const navigate = useNavigate();

  const handleSelectProduction = (production: Production) => {
    selectProduction(production);
    navigate('/production/' + production.id);
  };

  return (
    <div className='w-screen bg-background p-4 flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {productions.map((production) => (
          <Card
            key={production.id}
            icon={<PlayIcon />}
            title={production.name}
            subtitle={production.description}
            quickLinks={[
              {
                label: 'Ir para produção',
                onClick: () => {
                  handleSelectProduction(production);
                },
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};
