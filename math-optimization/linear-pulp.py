#!/usr/bin/env python
# coding: utf-8

# %% [markdown]
# Цех может производить стулья и столы. На производство
# стула идет 5 единиц материала, на производство стола - 20 единиц (футов красного
# дерева). Изготовление стула требует 10 человеко-часов, стола - 15. Имеется 400
# единиц материала и 450 человеко-часов. Прибыль при производстве стула - 45
# долларов США, при производстве стола - 80 долларов США.

# %%
from pulp import LpMaximize, LpProblem, LpVariable, LpStatus, value

prob = LpProblem("FindMaximumIncome", LpMaximize)

x1 = LpVariable("AmountOfChairs", 0)
x2 = LpVariable("AmountOfTables", 0)

prob += 45 * x1 + 80 * x2, "TotalIncome"
prob += 10 * x1 + 15 * x2 <= 450, "MaxTimeResources"
prob += 5 * x1 + 20 * x2 <= 400, "MaxWoodResources"

prob.solve()

print("Status:", LpStatus[prob.status])

for v in prob.variables():
    print(v.name, "=", v.varValue)

print("Total profit = ", value(prob.objective))
