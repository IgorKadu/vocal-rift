**Game Design Document (GDD) - Vocal Rift**

---

## ✨ Visão Geral do Jogo

**Nome Provisório:** Vocal Rift\
**Gênero:** Multiplayer Online 3D / PvP + PvE / Ação Estratégica por Comando de Voz\
**Plataforma-Alvo:** PC (inicialmente)

---

## 🏋️ Mecânicas Centrais

### Personagens

- Geração aleatória por partida (visual, atributos, habilidades).
- 5 habilidades por personagem:
  - 4 habilidades básicas.
  - 1 Ultimate (carrega com o uso das outras habilidades).
- Skills são ativadas apenas por **comandos de voz**.
- Movimentação por **WASD**, mira com **mouse**.

### Modos de Jogo

#### PvP Arena (5x5)

- Mapa com mobs espalhados que dão **ouro**.
- Jogadores enfrentam-se em equipes.
- A cada 5 minutos, aparecem **4 cartas com buffs passivos**. Cada jogador escolhe 1.
- Partida dura **25 minutos**.
- Pontuação:
  - +1 ponto por mob abatido.
  - +2 pontos por jogador abatido.
- Equipe com mais pontos vence.

#### PvE Coop

- 5 jogadores contra **ondas de bots inteligentes**.
- Progresso escalonado por tempo e dificuldade.

### Progressão de Conta

- Ganho de XP por desempenho.
- Top 5 jogadores da partida recebem **+50% XP bônus**.
- Progressão lenta, desbloqueando modos e conteúdos futuros.

---

## 🎭 Design Visual Sugerido

### Estilo Visual

- Gráficos low-poly estilizados.
- Cores vibrantes com contraste entre as equipes.
- Personagens: formas distintas, visuais exagerados.

### HUD

- Barras de vida e energia.
- Slots de habilidade com cooldown.
- Ouro atual do jogador.
- Interface de escolha de buffs em formato de cartas flutuantes.

### Mapas

- Arena florestal / ruínas / terras corrompidas.
- Distribuição de mobs de forma simétrica.

---

## 🌎 Roteiro Interativo de Gameplay

```
1. Jogador entra no lobby online
2. Sistema gera personagem aleatório
3. Partida é iniciada (modo PvP ou PvE)
4. Jogador se move com WASD, mira com mouse
5. Skills ativadas por voz (ex: "Chama", "Barreira")
6. Mobs surgem pelo mapa com ouro
7. A cada 5min: cartas com 4 buffs passivos
8. Jogador escolhe 1 buff (individual)
9. Compra itens com ouro (power-ups temporários)
10. Combate entre players e mobs
11. Pontuação somada em tempo real (HUD)
12. Após 25min: fim de partida, cálculo da equipe vencedora
13. Top 5 jogadores recebem XP bônus
14. XP aplicado na conta (progressão lenta)
```

---

## 💡 Exemplos de Skills (para protótipo)

- **Chama Fantasma**: lança projétil em linha reta (cooldown 6s).
- **Barreira de Pedra**: cria escudo à frente por 3s (cooldown 10s).
- **Pulo Sombrio**: teleporte curto na direção da mira (cooldown 8s).
- **Raio de Gelo**: dano em área e lentidão (cooldown 12s).
- **Ulti: Comando Final**: grande explosão em área (carrega com 5 usos de skills).

---

## ⚖️ Sistema de Buffs (Cartas Passivas)

- +10% velocidade de movimento
- +15% roubo de vida
- -20% cooldown nas habilidades
- +10% resistência a dano mágico
- +25% dano básico por 60s

---

## 📚 Conclusão

Esse MVP se baseia em uma proposta acessível, divertida e com potencial competitivo, destacando-se pelo uso inusitado de **comando de voz para conjuração de habilidades**. Ele mistura elementos de MOBA, roguelike e PvE cooperativo, com foco em rejogabilidade, variedade e progressão a longo prazo. Perfeito para evoluir em temporadas futuras com novos mapas, personagens e modos.

