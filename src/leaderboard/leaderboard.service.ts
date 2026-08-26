import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface LeaderboardEntry {
  'Marca temporal': string;
  'Nombre completo': string;
  Cargo: string;
  'Puntaje Dados': number | string;
  'Puntaje Ruleta': number | string;
  'Nombre Empresa': string;
  Teléfono: string;
  Total: number | string;
}

interface LeaderboardResponse {
  data: LeaderboardEntry[];
  total: number;
}

@Injectable()
export class LeaderboardService implements OnModuleInit {
  private readonly logger = new Logger(LeaderboardService.name);
  private cache: LeaderboardResponse = { data: [], total: 0 };
  private lastUpdated: Date | null = null;

  async onModuleInit() {
    await this.refresh();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async refresh() {
    const url = process.env.GOOGLE_SCRIPT_URL;
    if (!url) {
      this.logger.warn('GOOGLE_SCRIPT_URL no está definida, se omite el refresh');
      return;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Respuesta ${res.status} desde Google Script`);
      }
      const body = (await res.json()) as LeaderboardResponse;
      this.cache = body;
      this.lastUpdated = new Date();
    } catch (err) {
      this.logger.error('Falló el refresh del leaderboard', err as Error);
    }
  }

  getLeaderboard() {
    return {
      ...this.cache,
      lastUpdated: this.lastUpdated,
    };
  }
}
