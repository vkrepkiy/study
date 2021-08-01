#!/usr/bin/env python3
# coding: utf-8

# %% [markdown]
# # Решение "Задачи к экзамену.docx"
#
# Дано, целевая функция: 25x + 56y
#
# Найти: x и y при которых целевая функция принимает максимальное значение
#
# Ограничения:
# 5x + 2y <= 60
# 14x + 18y <= 400
# 14x + 8y <= 128
# x >= 1
# y >= 5

# %%
from pulp import LpProblem, LpVariable, LpMaximize, LpStatus, value

prob = LpProblem("FindMax", LpMaximize)

x = LpVariable("Параметр1", 1)
y = LpVariable("Параметр2", 5)

prob += 25*x + 56*y, "FindMax"
prob += 5*x + 2*y <= 60, "Limit1"
prob += 14*x + 18*y <= 400, "Limit2"
prob += 14*x + 8*y <= 128, "Limit3"

prob.solve()

print("Статус решения:", LpStatus[prob.status])

for v in prob.variables():
    print(v.name, "=", v.varValue)

print("Максимальная прибыль = ", value(prob.objective))

