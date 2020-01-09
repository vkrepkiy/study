#!/usr/bin/env python
# coding: utf-8

# %% [markdown]
# # Task 1
#
# Затраты на рекламу в месяц не должны превышать 10 000 денежных единиц (д.е). Минута радиорекламы стоит 5 д.е., а телерекламы 90 д.е. Фирма намерена использовать радиорекламу в три раза чаще чем телерекламу. Практика показывает, что 1 минута телерекламы обеспечивает объём продаж в 30 раз больший чем 1 минута радиорекламы.
# Определить такое распределение средств между двумя упомянутыми видами рекламы при котором объём продаж фирмы будет максимальным.

# %%
from os import path
from pulp import  LpMaximize, LpProblem, LpVariable, LpStatus, value, LpMinimize, LpInteger
import time

rootPath = path.dirname(path.abspath(__file__))
start = time.time()
x1 = LpVariable("x1", lowBound=0)
x2 = LpVariable("x2", lowBound=0)
problem = LpProblem('0',LpMaximize)
problem += 30*x1 +x2, "Функция цели"
problem += 90*x1+ 5*x2 <= 10000, "1"
problem +=x2 ==3*x1, "2"
problem.solve()
print ("Результат:")
for variable in problem.variables():
    print (variable.name, "=", variable.varValue)
print ("Прибыль:")
print (value(problem.objective))
stop = time.time()
print ("Время :")
print(stop - start)


# %% [markdown]
# # Task 2
#
# Whiskas cat food, shown above, is manufactured by Uncle Ben’s. Uncle Ben’s want to produce their cat food products as cheaply as possible while ensuring they meet the stated nutritional analysis requirements shown on the cans. Thus they want to vary the quantities of each ingredient used (the main ingredients being chicken, beef, mutton, rice, wheat and gel) while still meeting their nutritional standards.
#
# The costs of the chicken, beef, and mutton are 0.013, 0.008 and 0.010 respectively, while the costs of the rice, wheat and gel are 0.002, 0.005 and 0.001 respectively. (All costs are per gram.) For this exercise we will ignore the vitamin and mineral ingredients. (Any costs for these are likely to be very small anyway.)
#
# Each ingredient contributes to the total weight of protein, fat, fibre and salt in the final product. The contributions (in grams) per gram of ingredient are given in the table below.
#
# Stuff     |Protein|Fat  |Fibre|Salt
# ----------|-------|-----|-----|----
# Chicken   |0.100  |0.080|0.001|0.002
# Beef      |0.200  |0.100|0.005|0.005
# Rice      |0.000  |0.010|0.100|0.002
# Wheat bran|0.040  |0.010|0.150|0.008

# ## Simplified solution


# %%
# Import PuLP modeler functions
from pulp import  LpMaximize, LpProblem, LpVariable, LpStatus, value

# Create the 'prob' variable to contain the problem data
prob = LpProblem("TheWhiskasProblem",LpMinimize)

# The 2 variables Beef and Chicken are created with a lower limit of zero
x1=LpVariable("ChickenPercent",0,None,LpInteger)
x2=LpVariable("BeefPercent",0)

# The objective function is added to 'prob' first
prob += 0.013*x1 + 0.008*x2, "Total Cost of Ingredients per can"

# The five constraints are entered
prob += x1 + x2 == 100, "PercentagesSum"
prob += 0.100*x1 + 0.200*x2 >= 8.0, "ProteinRequirement"
prob += 0.080*x1 + 0.100*x2 >= 6.0, "FatRequirement"
prob += 0.001*x1 + 0.005*x2 <= 2.0, "FibreRequirement"
prob += 0.002*x1 + 0.005*x2 <= 0.4, "SaltRequirement"

# The problem data is written to an .lp file
prob.writeLP(path.join(rootPath, ".tmp_WhiskasModel.lp"))

# The problem is solved using PuLP's choice of Solver
prob.solve()

# The status of the solution is printed to the screen
print("Status:", LpStatus[prob.status])

# Each of the variables is printed with it's resolved optimum value
for v in prob.variables():
    print(v.name, "=", v.varValue)

# The optimised objective function value is printed to the screen
print("Total Cost of Ingredients per can = ", value(prob.objective))


# %% [markdown]
# ## Full solution

# %%
# Import PuLP modeler functions
from pulp import  LpMinimize, lpSum, LpProblem, LpVariable, LpStatus, value

# Creates a list of the Ingredients
Ingredients = ['CHICKEN', 'BEEF', 'MUTTON', 'RICE', 'WHEAT', 'GEL']

# A dictionary of the costs of each of the Ingredients is created
costs = {'CHICKEN': 0.013,
         'BEEF': 0.008,
         'MUTTON': 0.010,
         'RICE': 0.002,
         'WHEAT': 0.005,
         'GEL': 0.001}

# A dictionary of the protein percent in each of the Ingredients is created
proteinPercent = {'CHICKEN': 0.100,
                  'BEEF': 0.200,
                  'MUTTON': 0.150,
                  'RICE': 0.000,
                  'WHEAT': 0.040,
                  'GEL': 0.000}

# A dictionary of the fat percent in each of the Ingredients is created
fatPercent = {'CHICKEN': 0.080,
              'BEEF': 0.100,
              'MUTTON': 0.110,
              'RICE': 0.010,
              'WHEAT': 0.010,
              'GEL': 0.000}

# A dictionary of the fibre percent in each of the Ingredients is created
fibrePercent = {'CHICKEN': 0.001,
                'BEEF': 0.005,
                'MUTTON': 0.003,
                'RICE': 0.100,
                'WHEAT': 0.150,
                'GEL': 0.000}

# A dictionary of the salt percent in each of the Ingredients is created
saltPercent = {'CHICKEN': 0.002,
               'BEEF': 0.005,
               'MUTTON': 0.007,
               'RICE': 0.002,
               'WHEAT': 0.008,
               'GEL': 0.000}

# Create the 'prob' variable to contain the problem data
prob = LpProblem("TheWhiskasProblem", LpMinimize)

# A dictionary called 'ingredient_vars' is created to contain the referenced Variables
ingredient_vars = LpVariable.dicts("Ingr",Ingredients,0)

# The objective function is added to 'prob' first
prob += lpSum([costs[i]*ingredient_vars[i] for i in Ingredients]), "Total Cost of Ingredients per can"

# The five constraints are added to 'prob'
prob += lpSum([ingredient_vars[i] for i in Ingredients]) == 100, "PercentagesSum"
prob += lpSum([proteinPercent[i] * ingredient_vars[i] for i in Ingredients]) >= 8.0, "ProteinRequirement"
prob += lpSum([fatPercent[i] * ingredient_vars[i] for i in Ingredients]) >= 6.0, "FatRequirement"
prob += lpSum([fibrePercent[i] * ingredient_vars[i] for i in Ingredients]) <= 2.0, "FibreRequirement"
prob += lpSum([saltPercent[i] * ingredient_vars[i] for i in Ingredients]) <= 0.4, "SaltRequirement"

# The problem data is written to an .lp file
prob.writeLP(path.join(rootPath, ".tmp_WhiskasModel2.lp"))

# The problem is solved using PuLP's choice of Solver
prob.solve()

# The status of the solution is printed to the screen
print("Status:", LpStatus[prob.status])

# Each of the variables is printed with it's resolved optimum value
for v in prob.variables():
    print(v.name, "=", v.varValue)

# The optimised objective function value is printed to the screen
print("Total Cost of Ingredients per can = ", value(prob.objective))
