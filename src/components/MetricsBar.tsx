import StatisticsBar from '@/components/StatisticsBar'
import { homeStats } from '@/data/stats'

export default function MetricsBar() {
  return <StatisticsBar items={homeStats} label="SIS at a Glance" />
}
