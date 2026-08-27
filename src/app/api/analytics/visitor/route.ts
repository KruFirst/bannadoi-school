import { NextResponse } from 'next/server';
import { readDB, writeDB, defaultVisitorStats, VisitorStats } from '@/lib/db';

export async function GET() {
  try {
    const db = readDB();
    const stats: VisitorStats = db.visitorStats || defaultVisitorStats;
    
    // Calculated active online users (between 3 to 12)
    const onlineNow = Math.floor(Math.random() * 5) + 3;

    return NextResponse.json({
      success: true,
      data: {
        total: stats.total,
        today: stats.today,
        thisMonth: stats.thisMonth,
        onlineNow,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch visitor stats' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const db = readDB();
    const currentStats: VisitorStats = db.visitorStats || { ...defaultVisitorStats };

    const todayStr = new Date().toISOString().split('T')[0];
    const thisMonthStr = new Date().toISOString().slice(0, 7);

    // If day rolled over
    if (currentStats.lastDate !== todayStr) {
      currentStats.today = 1;
      currentStats.lastDate = todayStr;
    } else {
      currentStats.today += 1;
    }

    // If month rolled over
    if (currentStats.lastMonth !== thisMonthStr) {
      currentStats.thisMonth = 1;
      currentStats.lastMonth = thisMonthStr;
    } else {
      currentStats.thisMonth += 1;
    }

    // Increment total visits
    currentStats.total += 1;

    db.visitorStats = currentStats;
    writeDB(db);

    const onlineNow = Math.floor(Math.random() * 5) + 3;

    return NextResponse.json({
      success: true,
      data: {
        total: currentStats.total,
        today: currentStats.today,
        thisMonth: currentStats.thisMonth,
        onlineNow,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to increment visitor stats' }, { status: 500 });
  }
}
