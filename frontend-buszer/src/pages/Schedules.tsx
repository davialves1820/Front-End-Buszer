import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ScheduleCard } from '@/components/schedules/ScheduleCard';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/models';
import { ScheduleService } from '@/services/scheduleService';
import { toast } from 'sonner';
import { MapPin, Clock } from 'lucide-react';

type ViewMode = 'schedules' | 'map';

const Schedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('schedules');
  const [trackingEnabled, setTrackingEnabled] = useState(false);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const data = await ScheduleService.getSchedules();
      setSchedules(data);
    } catch (error) {
      toast.error('Erro ao carregar horários');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = (schedule: Schedule) => {
    setViewMode('map');
    setTrackingEnabled(true);
    toast.info(`Rastreando ${schedule.line} - Campus ${schedule.campus}`);
  };

  const handleActivateTracking = () => {
    setTrackingEnabled(!trackingEnabled);
    toast.success(trackingEnabled ? 'Rastreamento desativado' : 'Rastreamento ativado');
  };

  return (
    <Layout currentPath="/schedules">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12">Buszer</h1>

        {viewMode === 'map' && (
          <Button
            variant="secondary"
            className="mb-6 gap-2"
            onClick={() => setViewMode('schedules')}
          >
            <MapPin className="w-5 h-5" />
            MAPA
          </Button>
        )}
        
        {viewMode === 'schedules' ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Horários</h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl h-48 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {schedules.map((schedule) => (
                  <ScheduleCard
                    key={schedule.id}
                    schedule={schedule}
                    onTrack={() => handleTrack(schedule)}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
              <Button 
                size="lg"
                className="bg-[#017D97] hover:bg-[#06242E] text-primary-foreground px-8 w-full sm:w-auto"
              >
                TODOS OS HORÁRIOS
              </Button>
              <Button 
                size="lg"
                className="bg-[#017D97] hover:bg-[#06242E] text-primary-foreground px-8 w-full sm:w-auto"
                onClick={() => setViewMode('map')}
              >
                MAPA
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Map View */}
            <div className="relative bg-muted rounded-2xl h-[400px] sm:h-[500px] flex items-center justify-center mb-6 sm:mb-8">
              <Button
                size="lg"
                variant={trackingEnabled ? 'destructive' : 'secondary'}
                className="gap-2"
                onClick={handleActivateTracking}
              >
                <MapPin className="w-5 h-5" />
                {trackingEnabled ? 'DESATIVAR RASTREAMENTO' : 'ATIVAR RASTREAMENTO'}
              </Button>
            </div>

            <Button
              variant="secondary"
              className="mb-6 gap-2"
              onClick={() => setViewMode('schedules')}
            >
              <Clock className="w-5 h-5" />
              HORÁRIOS
            </Button>

            {/* Show last 2 schedules at bottom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {schedules.slice(0, 2).map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  onTrack={() => handleTrack(schedule)}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 w-full sm:w-auto"
                onClick={() => setViewMode('schedules')}
              >
                TODOS OS HORÁRIOS
              </Button>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 w-full sm:w-auto"
              >
                MAPA
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Schedules;
