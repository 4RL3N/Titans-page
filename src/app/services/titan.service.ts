import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, Observable, of } from 'rxjs';
import { Titan, TitanMetrics } from '../models/titan'; 

@Injectable({ providedIn: 'root' })
export class TitanService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.attackontitanapi.com/titans';

  private backupTitans: any[] = [
    { name: "Founding Titan", height: "13m", abilities: ["Criação de Titãs", "Controle Mental", "Alteração de Memória"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/6/6e/Founding_Titan_character_image.png" },
    { name: "Attack Titan", height: "15m", abilities: ["Visão do Futuro", "Regeneração", "Fúria"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/d/d3/Attack_Titan_character_image.png" },
    { name: "Colossal Titan", height: "60m", abilities: ["Emissão de Vapor", "Explosão Nuclear", "Tamanho Colossal"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/4/4c/Colossal_Titan_character_image.png" },
    { name: "Armored Titan", height: "15m", abilities: ["Pele Encouraçada", "Endurecimento", "Força Bruta"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/6/69/Armored_Titan_character_image.png" },
    { name: "Female Titan", height: "14m", abilities: ["Atração de Titãs", "Cristalização", "Agilidade"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/0/09/Female_Titan_character_image.png" },
    { name: "Beast Titan", height: "17m", abilities: ["Arremesso Preciso", "Controle de Titãs", "Fala"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/9/91/Beast_Titan_character_image.png" },
    { name: "Jaw Titan", height: "5m", abilities: ["Mandíbula Poderosa", "Garras Afiadas", "Alta Velocidade"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/5/53/Jaw_Titan_character_image.png" },
    { name: "Cart Titan", height: "4m", abilities: ["Resistência Extrema", "Quadrupede", "Suporte de Armas"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/1/14/Cart_Titan_character_image.png" },
    { name: "War Hammer Titan", height: "15m", abilities: ["Criação de Armas", "Controle Remoto", "Endurecimento Estrutural"], img: "https://static.wikia.nocookie.net/shingekinokyojin/images/3/30/War_Hammer_Titan_character_image.png" }
  ];

  private metricsMap: Record<string, TitanMetrics> = {
    'Colossal Titan': { strength: 100, speed: 10, size: 100, hardness: 20 },
    'Armored Titan': { strength: 80, speed: 40, size: 50, hardness: 100 },
    'Attack Titan': { strength: 75, speed: 70, size: 50, hardness: 60 },
    'Female Titan': { strength: 70, speed: 85, size: 45, hardness: 70 },
    'Beast Titan': { strength: 85, speed: 50, size: 60, hardness: 40 },
    'Jaw Titan': { strength: 50, speed: 100, size: 20, hardness: 50 },
    'Cart Titan': { strength: 30, speed: 90, size: 15, hardness: 20 },
    'War Hammer Titan': { strength: 85, speed: 60, size: 50, hardness: 95 },
    'Founding Titan': { strength: 90, speed: 50, size: 90, hardness: 50 }
  };

  private nineTitansNames = [
    'Colossal Titan', 'Armored Titan', 'Attack Titan', 'Female Titan', 
    'Beast Titan', 'Jaw Titan', 'Cart Titan', 'War Hammer Titan', 'Founding Titan'
  ];

  getTitans(): Observable<Titan[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(() => console.log('✅ SUCESSO: Dados carregados da API Oficial!')),
      map(response => {
        const rawData = response.results || [];
        return this.processData(rawData);
      }),
      catchError(err => {
        console.warn('⚠️ AVISO: A API falhou. Carregando dados de backup.', err);
        return of(this.processData(this.backupTitans)); 
      })
    );
  }

  private processData(rawData: any[]): Titan[] {
    return rawData
      .filter((t: any) => this.nineTitansNames.some(name => t.name.includes(name) || name === t.name))
      .map((t: any) => this.enhanceTitanData(t));
  }

  private enhanceTitanData(data: any): Titan {
    const key = Object.keys(this.metricsMap).find(k => data.name.includes(k)) || 'Attack Titan';
    
    let imageUrl = data.img;
    if(imageUrl && imageUrl.includes('.png')) {
       imageUrl = imageUrl.split('.png')[0] + '.png';
    }

    let abilitiesPT = data.abilities || [];
    
    // Dicionário de tradução
    const translationMap: Record<string, string> = {
      "Hardening": "Endurecimento",
      "Steam emission": "Emissão de Vapor",
      "Titan control": "Controle de Titãs",
      "Armored skin": "Pele Blindada",
      "Future memory inheritance": "Herança de Memória do Futuro",
      "Crystallization": "Cristalização",
      "Regeneration": "Regeneração",
      "Speech": "Fala",
      "High endurance": "Alta Resistência",
      "Structural hardening": "Endurecimento Estrutural",
      "Remote operation": "Operação Remota",
      "Explosive transformation": "Transformação Explosiva",
      "Titan creation": "Criação de Titãs",
      "Versatility": "Versatilidade",
      "Attraction": "Atração de Titãs",
      "Powerful jaw strength": "Mandíbula Poderosa",
      "Hardened claws": "Garras Endurecidas",
      "Great speed and agility": "Alta Velocidade e Agilidade",
      "Quadrupedal form": "Forma Quadrúpede",
      "Great speed": "Alta Velocidade",
      "Steam generation": "Geração de Vapor",
      "Memory inheritance": "Herança de Memória",
      "Titan behavioral control": "Controle Comportamental de Titãs",
      "Memory and body manipulation of subjects of ymir": "Manipulação de Súditos de Ymir",
      "Telepathic communication with subjects of ymir": "Comunicação Telepática com os Súditos de Ymir",
      "Powerful and accurate throwing": "Arremesso Preciso"
    };

    if (Array.isArray(abilitiesPT)) {
        abilitiesPT = abilitiesPT.map((ability: string) => {
          const cleanAbility = ability.trim();
          return translationMap[cleanAbility] || cleanAbility;
        });
    }

    return {
      ...data,
      id: data.id || 0,
      abilities: abilitiesPT,
      allegiance: 'Eldia', 
      img: imageUrl,
      metrics: this.metricsMap[key] || { strength: 50, speed: 50, size: 50, hardness: 50 },
      isShifter: true,
      description: this.getDescription(data.name)
    };
  }

  private getDescription(name: string): string {
    if (name.includes('Colossal')) return 'O Deus da Destruição. Capaz de emitir vapor escaldante e causar explosões nucleares ao se transformar.';
    if (name.includes('Armored')) return 'O escudo inquebrável de Marley. Seu corpo é coberto por placas de pele endurecida.';
    if (name.includes('Attack')) return 'Aquele que sempre avançou em busca da liberdade. Possui a habilidade de ver memórias de futuros herdeiros.';
    if (name.includes('Female')) return 'Conhecida por sua versatilidade em combate, alta resistência e capacidade de atrair titãs puros.';
    if (name.includes('Beast')) return 'Um titã com características animais e inteligência superior. Capaz de arremessar projéteis com precisão devastadora.';
    if (name.includes('Jaw')) return 'O mais rápido e ágil. Suas mandíbulas e garras podem triturar quase qualquer material endurecido.';
    if (name.includes('Cart')) return 'Possui resistência extrema, capaz de manter a forma de titã por meses. Usado como unidade de suporte tático.';
    if (name.includes('War Hammer')) return 'Cria armas e estruturas complexas a partir de sua própria carne endurecida. O operador pode controlar o titã à distância.';
    if (name.includes('Founding')) return 'O ponto de coordenadas onde todos os caminhos se cruzam. Pode controlar outros titãs e alterar memórias dos súditos de Ymir.';
    return 'Um dos nove poderes titânicos lendários.';
  }
}