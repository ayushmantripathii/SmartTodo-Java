import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import { Select } from "@mantine/core";


import {
  AppShell,
  Navbar,
  Header,
  Button,
  TextInput,
  Card,
  Group,
  Checkbox,
  Text,
  Stack,
  Title,
  Divider
} from "@mantine/core";
import { supabase } from "../supabaseClient";

export default function MainLayout() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [activeSection, setActiveSection] = useState("Today");
  const [selectedDate, setSelectedDate] = useState(new Date());
const minimalCalendarStyles = {
  calendarHeader: { marginBottom: 6 },
  calendarHeaderLevel: { fontSize: 14, fontWeight: 500, color: "#0F172A" },
  day: {
    fontSize: 13,
    borderRadius: 6,
    transition: "all 0.15s ease",
    "&:hover": { backgroundColor: "#EEF2FF" }
  },
  weekday: { fontSize: 12, color: "#64748B" },
  month: { gap: 6 },
};
const [priority, setPriority] = useState("medium");

  const todayStr = new Date().toISOString().split("T")[0];

  function formatDueDate(dateStr) {
    const today = new Date();
    const due = new Date(dateStr);

    today.setHours(0,0,0,0);
    due.setHours(0,0,0,0);

    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";

    return due.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const isToday = (date) => date === todayStr;
  const isUpcoming = (date) => date > todayStr;

  function formatTaskDate(dateStr) {
    const today = new Date();
    const taskDate = new Date(dateStr);

    const t0 = new Date(today.toDateString());
    const t1 = new Date(taskDate.toDateString());

    const diffDays = Math.round((t1 - t0) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { label: "Today", color: "#2563EB" };
    if (diffDays === 1) return { label: "Tomorrow", color: "#F97316" };

    const formatted = taskDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    if (diffDays < 0) {
  return { label: "Overdue", color: "#EF4444" };
}

return {
  label: formatted,
  color: "#6B7280",
};

  }

 const sectionTitleMap = {
  Overdue: "Overdue Tasks",
  Today: "Today’s Tasks",
  Upcoming: "Upcoming Tasks",
  Completed: "Completed Tasks",
};

  async function loadTasks() {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    setTasks(data || []);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask() {
  if (!text.trim()) return;

  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from("tasks").insert({
    title: text,
    user_id: user.id,
    completed: false,
    due_date: selectedDate.toISOString().split("T")[0],
    priority: priority,
  });

  setText("");
  setPriority("medium");
  loadTasks();
}


  async function toggleTask(task) {
    await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    loadTasks();
  }

  async function deleteTask(id) {
    await supabase.from("tasks").delete().eq("id", id);
    loadTasks();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  const filteredTasks = tasks.filter((task) => {
  if (activeSection === "Completed") return task.completed;

  if (activeSection === "Overdue")
    return !task.completed && task.due_date < todayStr;

  if (activeSection === "Today")
    return !task.completed && task.due_date === todayStr;

  if (activeSection === "Upcoming")
    return !task.completed && task.due_date > todayStr;

  return true;
});


  return (
    <AppShell padding="lg" sx={{ backgroundColor: "#F8FAFC" }}
      navbar={
        <Navbar width={{ base: 240 }} p="md">
          <Stack gap="md">

            <Title order={4} sx={{ fontWeight: 600, color: "#0F172A" }}>
              Dashboard
            </Title>

            <Divider />

            {["Overdue","Today", "Upcoming", "Completed"].map((item) => {
              const active = item === activeSection;

              return (
                <Group
                  key={item}
                  px="sm"
                  py={8}
                  onClick={() => setActiveSection(item)}
                  sx={{
                    borderRadius: 8,
                    cursor: "pointer",
                    backgroundColor: active ? "rgba(45, 212, 191, 0.12)" : "transparent",
                    borderLeft: active ? "4px solid #2DD4BF" : "4px solid transparent",
                    transition: "all 0.2s ease",
                    ":hover": { backgroundColor: "rgba(45, 212, 191, 0.08)" }
                  }}
                >
                  <Text
                    size="sm"
                    fw={active ? 600 : 500}
                    c={active ? "#0F172A" : "#64748B"}
                  >
                    {item}
                  </Text>
                </Group>
              );
            })}
          </Stack>
        </Navbar>
      }

      header={
        <Header height={64} p="md">
          <Group h="100%" position="apart">
            <Title order={3} sx={{ fontWeight: 700, letterSpacing: "0.4px", color: "#6366F1" }}>
              Nucleus
            </Title>

            <Button size="sm" radius="md" onClick={handleLogout}
              sx={{ backgroundColor: "#EF4444", ":hover": { backgroundColor: "#DC2626" } }}>
              Logout
            </Button>
          </Group>
        </Header>
      }
    >
      <Stack maw={720} mx="auto" spacing="lg">

        <Group align="flex-end">
          <TextInput
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ flex: 1 }}
            radius="md"
            size="md"
            styles={{ input: { backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" } }}
          />

          <DateInput
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date()}
  radius="md"
  size="md"
  styles={{
    input: {
      backgroundColor: "#FFFFFF",
      borderColor: "#E5E7EB",
      fontSize: 14,
      height: 40,
    },
    calendarHeader: { marginBottom: 6 },
    calendarHeaderLevel: { fontSize: 14, fontWeight: 500, color: "#0F172A" },
    day: {
      fontSize: 13,
      borderRadius: 6,
      transition: "all 0.15s ease",
      "&:hover": { backgroundColor: "#EEF2FF" },
    },
    weekday: { fontSize: 12, color: "#64748B" },
    month: { gap: 6 },
  }}
  popoverProps={{
    shadow: "md",
    withinPortal: true,
    styles: {
      dropdown: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
      },
    },
  }}
/>
  <Select
    value={priority}
    onChange={setPriority}
    data={[
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ]}
    radius="md"
    size="md"
    styles={{ input: { backgroundColor: "#FFFFFF" } }}
  />

          <Button size="md" radius="md" onClick={addTask}
            sx={{ backgroundColor: "#6366F1", ":hover": { backgroundColor: "#4F46E5" } }}>
            Add
          </Button>
        </Group>

        <Stack spacing="sm">
        {activeSection === "Overdue" && filteredTasks.length > 0 && (
  <Card
    withBorder
    radius="md"
    p="sm"
    sx={{
      backgroundColor: "#FEF2F2",
      borderColor: "#FECACA",
      color: "#991B1B",
    }}
  >
    <Text size="sm" fw={600}>
      ⚠️ You have {filteredTasks.length} overdue task{filteredTasks.length > 1 ? "s" : ""}
    </Text>
    <Text size="xs" c="#7F1D1D">
      Let's get back on track.
    </Text>
  </Card>
)}
<Group grow>
  <Card withBorder radius="md" p="sm">
    <Text size="xs" c="#64748B">Total Tasks</Text>
    <Text fw={700} size="lg">{tasks.length}</Text>
  </Card>

  <Card withBorder radius="md" p="sm">
    <Text size="xs" c="#64748B">Overdue</Text>
    <Text fw={700} size="lg" c="#EF4444">
      {tasks.filter(t => !t.completed && t.due_date < todayStr).length}
    </Text>
  </Card>

  <Card withBorder radius="md" p="sm">
    <Text size="xs" c="#64748B">Completed</Text>
    <Text fw={700} size="lg" c="#16A34A">
      {tasks.filter(t => t.completed).length}
    </Text>
  </Card>
</Group>

        <Group position="apart" align="center">
  <Title order={5} c="#d51a1a" fw={600}>
    {sectionTitleMap[activeSection]}
  </Title>
{filteredTasks.length === 0 && (
  <Card
    withBorder
    radius="md"
    p="lg"
    sx={{
      textAlign: "center",
      backgroundColor: "#FFFFFF",
      borderStyle: "dashed",
      borderColor: "#E5E7EB"
    }}
  >
    <Text size="sm" c="#64748B">
      No tasks in this section yet.
    </Text>
  </Card>
)}

  <Select
    placeholder="Sort by"
    data={[
      { value: "date", label: "Due Date" },
      { value: "priority", label: "Priority" },
    ]}
    radius="md"
    size="sm"
    w={160}
  />
</Group>


         {filteredTasks.map((task) => {
  const meta = formatTaskDate(task.due_date);

  return (
    <Card key={task.id} withBorder radius="md" p="md"
      sx={{
        transition: "all 0.2s ease",
        ":hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }
      }}
    >
      <Group position="apart">
        <Group spacing="sm">
          <Checkbox checked={task.completed} onChange={() => toggleTask(task)} />

          <Stack spacing={2}>
            <Text size="sm" fw={500}
              td={task.completed ? "line-through" : "none"}
              c={task.completed ? "#94A3B8" : "#0F172A"}>
              {task.title}
            </Text>

            <Text size="xs" fw={500} c={meta.color}>
              {meta.label}
            </Text>
          </Stack>
        </Group>

        <Button size="xs" color="red" variant="subtle" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </Group>
    </Card>
  );
})}

          
        </Stack>
      </Stack>
    </AppShell>
  );
}
