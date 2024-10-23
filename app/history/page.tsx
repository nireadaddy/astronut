import { Header } from '@/components/ui/Header';
import { ReadingHistory } from '@/components/readings/ReadingHistory';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          ประวัติการดูดวง
        </h1>
        <ReadingHistory />
      </main>
    </div>
  );
}
