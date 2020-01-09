#!/usr/bin/env python
# coding: utf-8

# %% [markdown]
# Затраты на рекламу в месяц не должны превышать 10 000 денежных единиц (д.е). Минута радиорекламы стоит 5 д.е., а телерекламы 90 д.е. Фирма намерена использовать радиорекламу в три раза чаще чем телерекламу. Практика показывает, что 1 минута телерекламы обеспечивает объём продаж в 30 раз больший чем 1 минута радиорекламы.
# Определить такое распределение средств между двумя упомянутыми видами рекламы при котором объём продаж фирмы будет максимальным.

# %%
from scipy.optimize import linprog
import time
start = time.time()
c = [-30,-1] #Функция цели
A_ub = [[90,5]]  #'1'
b_ub = [10000]#'1'
A_eq = [[3,-1]] #'2'
b_eq = [0] #'2'
print (linprog(c, A_ub, b_ub, A_eq, b_eq))
stop = time.time()
print ("Время :")
print(stop - start)

# %% [markdown]
# Список c = [-30,-1] содержит коэффициенты функции цели с обратным знаком, поскольку linprog () ищет минимум. Матрица A_ub содержит коэффициенты при переменных для условий в виде неравенств. Для нашей задачи это 90x1+5x2 <=10000. Значения в правой части неравнства-1000, помещается в список b_ub. Матрица A_eq содержит коэффициенты при переменных для условий в виде равенств. Для нашей задачи 3x1-x2=0, причём ноль в правой части, помещается в список b_eq.
