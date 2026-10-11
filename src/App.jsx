import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckSquare,
  Square,
  Activity,
  MessageCircle,
  Compass,
  Timer,
  ChevronRight,
  Flame
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tactics'); // 'tactics' | 'labor' | 'chat'
  const [laborActive, setLaborActive] = useState(false);
  const [contractions, setContractions] = useState([]);
  const [startTime, setStartTime] = useState(null);

  // Состояние чек-листа сумки в роддом
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Паспорт, полис ОМС, СНИЛС + копии', done: true },
    { id: 2, text: 'Оригинал обменной карты с анализами', done: true },
    { id: 3, text: 'Чистая сменная обувь (моющиеся тапочки)', done: false },
    { id: 4, text: 'Зарядка для телефона 2м + повербанк', done: false },
    { id: 5, text: 'Перекус: орехи, батончики, вода со спортивным дозатором', done: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  // Логика счетчика схваток
  const toggleContraction = () => {
    if (!laborActive) {
      setLaborActive(true);
      setStartTime(Date.now());
    } else {
      setLaborActive(false);
      const duration = Math.round((Date.now() - startTime) / 1000);
      setContractions([{ id: Date.now(), duration, time: new Date().toLocaleTimeString().slice(0, 5) }, ...contractions]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-20">
     
      {/* ВЕРХНИЙ СТАТУСНЫЙ БАР */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="font-bold tracking-wider text-sm uppercase">ШТУРМАН // BOSH</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-slate-400 font-mono">СТАТУС: ШТАТНО</span>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="p-4 flex-1 space-y-4 max-w-md mx-auto w-full">

        {/* ВКЛАДКА 1: ТАКТИКА */}
        {activeTab === 'tactics' && (
          <>
            {/* ТАКТИЧЕСКИЙ ДАШБОРД СРОКА */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-slate-400 font-mono">ТЕКУЩИЙ ЭТАП</span>
                  <div className="text-2xl font-black text-white mt-0.5">31 неделя • 4 дня</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono">ДО ПДР</span>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">~60 дней</div>
                </div>
              </div>
             
              {/* Прогресс-бар */}
              <div className="mt-4">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[78%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>20 нед (старт)</span>
                  <span>40 нед (роды)</span>
                </div>
              </div>
            </div>

            {/* СВОДКА ЭКИПАЖА */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                <Activity className="w-4 h-4" />
                <span>Физиология партнерши прямо сейчас</span>
              </div>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Матка поднялась высоко к диафрагме — ей не хватает воздуха при ходьбе. Центр тяжести смещен: к вечеру гарантированно тянет крестец.
              </p>
            </div>

            {/* БОЕВАЯ ЗАДАЧА ДНЯ */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                <Flame className="w-4 h-4" />
                <span>Боевая задача на вечер</span>
              </div>
              <p className="text-sm text-slate-200 mt-2 font-medium">
                Забери ужин сам или закажи доставку. Сделай 10-минутный массаж стоп. Разговоры о расходах и ремонте сегодня исключить.
              </p>
              <div className="mt-3 pt-3 border-t border-emerald-500/20 text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">Готовая фраза:</span> «Я всё взял на себя, ты просто отдыхай».
              </div>
            </div>

            {/* ЧЕК-ЛИСТ СУМКИ В РОДДОМ */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Чек-лист: Сумка отца
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {checklist.filter(i => i.done).length}/{checklist.length}
                </span>
              </div>
              <div className="space-y-2">
                {checklist.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="w-full flex items-center space-x-3 text-left p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 transition"
                  >
                    {item.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-xs ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ВКЛАДКА 2: РЕЖИМ РОДЫ */}
        {activeTab === 'labor' && (
          <div className="space-y-4">
            <div className="bg-red-950/20 border border-red-500/40 rounded-xl p-4 text-center">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-400 uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>Боевой протокол схваток</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Нажимай кнопку при начале спазма и отпускай, когда боль полностью отпустила.
              </p>
            </div>

            {/* БОЛЬШАЯ КНОПКА СХВАТКИ */}
            <div className="py-6 flex justify-center">
              <button
                onClick={toggleContraction}
                className={`w-44 h-44 rounded-full font-black text-base uppercase tracking-wider transition-all shadow-xl active:scale-95 flex flex-col items-center justify-center border-4 ${
                  laborActive
                    ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-red-600/50'
                    : 'bg-slate-800 border-slate-700 hover:border-emerald-500 text-slate-200 shadow-slate-950'
                }`}
              >
                <Timer className="w-8 h-8 mb-2" />
                <span>{laborActive ? 'ОТПУСТИЛО' : 'СХВАТКА ПОШЛА'}</span>
              </button>
            </div>

            {/* ИСТОРИЯ СХВАТОК */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">
                Журнал схваток
              </span>
              {contractions.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-600">Схватки еще не зафиксированы</div>
              ) : (
                <div className="space-y-2">
                  {contractions.map((c, idx) => (
                    <div key={c.id} className="flex justify-between items-center text-xs p-2 bg-slate-800/40 rounded border border-slate-800">
                      <span className="text-slate-400">Схватка #{contractions.length - idx} ({c.time})</span>
                      <span className="font-mono font-bold text-emerald-400">{c.duration} сек</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ВКЛАДКА 3: AI-ШТУРМАН */}
        {activeTab === 'chat' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-96 flex flex-col justify-between">
            <div className="space-y-3 overflow-y-auto pr-1">
              <div className="bg-slate-800/80 p-3 rounded-lg text-xs leading-relaxed text-slate-200">
                <span className="font-bold text-emerald-400 block mb-1">Штурман:</span>
                На связи. Чем помочь? Могу разобрать симптомы, подсказать технику дыхания или расшифровать назначения врача.
              </div>
            </div>
           
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Спросить Штурмана..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-bold">
                Отправить
              </button>
            </div>
          </div>
        )}

      </main>

      {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ (BOTTOM BAR) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-slate-800 p-2 z-50">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab('tactics')}
            className={`flex flex-col items-center py-1.5 rounded-lg transition ${
              activeTab === 'tactics' ? 'text-emerald-400 bg-slate-800/80' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Compass className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Тактика</span>
          </button>
         
          <button
            onClick={() => setActiveTab('labor')}
            className={`flex flex-col items-center py-1.5 rounded-lg transition ${
              activeTab === 'labor' ? 'text-red-400 bg-red-950/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Timer className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Режим РОДЫ</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center py-1.5 rounded-lg transition ${
              activeTab === 'chat' ? 'text-emerald-400 bg-slate-800/80' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">AI-Чат</span>
          </button>
        </div>
      </nav>

    </div>
  );
}