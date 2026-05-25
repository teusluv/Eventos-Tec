import re

file_path = 'src/app/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove MOCK_EVENTS
content = re.sub(r'const MOCK_EVENTS = \[.*?\];', '', content, flags=re.DOTALL)

# 2. Remove fallback logic
content = re.sub(r'// Merge dbEvents with fallbacks.*?\n  \}', '  const displayEvents = [...dbEvents];', content, flags=re.DOTALL)

# 3. Update status extraction
content = content.replace('const status1 = getEventStatus(e1.date);', 'const status1 = e1 ? getEventStatus(e1.date) : null;')
content = content.replace('const status2 = getEventStatus(e2.date);', 'const status2 = e2 ? getEventStatus(e2.date) : null;')
content = content.replace('const status3 = getEventStatus(e3.date);', 'const status3 = e3 ? getEventStatus(e3.date) : null;')
content = content.replace('const status4 = getEventStatus(e4.date);', 'const status4 = e4 ? getEventStatus(e4.date) : null;')

# 4. Conditionally render events
content = content.replace('<div className="md:col-span-8 h-full relative">', '{e1 && (\n          <div className="md:col-span-8 h-full relative">', 1)
content = content.replace('</Link>\n          </div>\n\n          {/* Event 2 (Small) */}', '</Link>\n          </div>\n          )}\n\n          {/* Event 2 (Small) */}')

content = content.replace('<div className="md:col-span-4 h-full relative">', '{e2 && (\n          <div className="md:col-span-4 h-full relative">', 1)
content = content.replace('</Link>\n          </div>\n\n          {/* Event 3 (Small) */}', '</Link>\n          </div>\n          )}\n\n          {/* Event 3 (Small) */}')

content = content.replace('{/* Event 3 (Small) */}\n          <div className="md:col-span-4 h-full relative">', '{/* Event 3 (Small) */}\n          {e3 && (\n          <div className="md:col-span-4 h-full relative">')
content = content.replace('</Link>\n          </div>\n\n          {/* Event 4 (Large) */}', '</Link>\n          </div>\n          )}\n\n          {/* Event 4 (Large) */}')

content = content.replace('{/* Event 4 (Large) */}\n          <div className="md:col-span-8 h-full relative">', '{/* Event 4 (Large) */}\n          {e4 && (\n          <div className="md:col-span-8 h-full relative">')
content = content.replace('</span>\n              </div>\n            </div>\n          </div>\n        </div>', '</span>\n              </div>\n            </div>\n          </div>\n          )}\n        </div>')

# 5. Fallback for 0 events
content = content.replace('<div className="grid grid-cols-1 md:grid-cols-12 gap-lg auto-rows-[300px]">', '{displayEvents.length === 0 ? (\n          <div className="w-full text-center py-xl glass-panel rounded-xl glow-border"><p className="text-on-surface-variant font-body-lg">Nenhum evento em destaque no momento.</p></div>\n        ) : (\n        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg auto-rows-[300px]">')
content = content.replace(')}\n        </div>\n      </section>', ')}\n        </div>\n        )}\n      </section>')

# 6. Fix status variables accessing properties
content = content.replace('status1.', 'status1?.')
content = content.replace('status2.', 'status2?.')
content = content.replace('status3.', 'status3?.')
content = content.replace('status4.', 'status4?.')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('File updated successfully.')
