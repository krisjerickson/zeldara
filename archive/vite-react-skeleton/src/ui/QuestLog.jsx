import React, { useState } from 'react';
import { MAIN_QUEST_KEYS, SECTIONS } from '../game/constants.js';

const MAIN_QUEST_DEFS = {
  dungeon: {
    title: 'Dungeon Crawl', icon: '⚔️',
    desc: 'Descend to the deepest level and defeat the boss. Reward: new mount, gold, gems.',
  },
  tower: {
    title: 'Tower Rescue', icon: '🗼',
    desc: 'Climb to the top and defeat the Warlock. Rescue the master builder. Reward: builder NPC, artifacts, ring, teleport mirror.',
  },
  harbor: {
    title: 'Island Exploration', icon: '⚓',
    desc: 'Sail to the island, explore the dungeon within, defeat all enemies. Reward: new skills, gold, XP.',
  },
  skyport: {
    title: 'Sky Exploration', icon: '🎈',
    desc: 'Ascend to the sky island, reach the top of the tower. Reward: new familiar, ring, teleport mirror.',
  },
};

export default function QuestLog({ uiState, worldScene, onClose }) {
  const [tab, setTab] = useState('main');
  const completedQuests = worldScene?.player?.quests?.completed ?? [];
  const activeQuest = worldScene?.player?.quests?.active;
  const section = uiState.section ?? 1;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal quest-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span>📜 Quest Journal</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-tabs">
          <button className={tab==='main'?'tab active':'tab'} onClick={() => setTab('main')}>Main Quests</button>
          <button className={tab==='side'?'tab active':'tab'} onClick={() => setTab('side')}>Side Quests</button>
        </div>

        {tab === 'main' && (
          <div className="quest-list">
            {[1,2,3,4].map(sec => {
              const unlocked = uiState.unlockedSections?.includes(sec);
              return (
                <div key={sec} className={`quest-section-group ${unlocked ? '' : 'locked'}`}>
                  <div className="quest-section-header">
                    Section {sec}: {SECTIONS[sec]?.name} {!unlocked && '🔒'}
                  </div>
                  {unlocked && MAIN_QUEST_KEYS[sec].map(key => {
                    const type = key.split('_').slice(1).join('_');
                    const def = MAIN_QUEST_DEFS[type];
                    const done = completedQuests.includes(key);
                    const active = activeQuest === key;
                    return (
                      <div key={key} className={`quest-item ${done?'done':''} ${active?'active':''}`}>
                        <div className="quest-icon">{def?.icon ?? '❓'}</div>
                        <div className="quest-info">
                          <div className="quest-title">{def?.title ?? key} {done && '✓'}</div>
                          <div className="quest-desc">{def?.desc}</div>
                        </div>
                        {!done && !active && unlocked && (
                          <button className="quest-accept" onClick={() => {
                            if (worldScene?.player) {
                              worldScene.player.quests.active = key;
                              worldScene._showNotif('Quest accepted: ' + def?.title, '#ffdd44');
                            }
                          }}>Accept</button>
                        )}
                        {active && <span className="quest-active-badge">ACTIVE</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'side' && (
          <div className="quest-list">
            <div className="quest-placeholder">
              💡 Side quests become available in each section. Visit the Quest Board in the village to discover them (costs gold to learn details).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
