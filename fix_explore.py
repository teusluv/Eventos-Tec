import re

file_path = 'src/app/explore/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove MOCK_EVENTS array
content = re.sub(r'const MOCK_EVENTS: EventItem\[\] = \[.*?\];', '', content, flags=re.DOTALL)

# 2. Fix the condition that throws error when list is empty
target_block = """          if (mapped.length > 0) {
            setEvents(mapped);
            setLoading(false);
            return;
          }
        }
        throw new Error("Empty list returned");
      } catch (err) {
        console.warn("API offline or CORS blocked. Using local mock data.", err);
        setEvents(MOCK_EVENTS);
      } finally {"""

replacement_block = """          setEvents(mapped);
          setLoading(false);
          return;
        }
        throw new Error("Invalid response format");
      } catch (err) {
        console.warn("API offline or CORS blocked.", err);
        setEvents([]);
      } finally {"""

content = content.replace(target_block, replacement_block)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Explore page updated successfully.')
