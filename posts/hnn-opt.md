---
title: "Hopfield Neural Networks for Combinatorial Optimization"
date: '2023-06-05'
---

# Hopfield Neural Networks

### Overview
* A class of artificial neural network that falls under the category of Recurrent Neural Networks
* Well suited for pattern recognition, certain kinds of optimization, and associative memory applications
* Can be operated with discrete or continuous variables as inputs
* In the context of this work, we focus on an HNN architecture with binary neurons operating on values $\{-1, 1\}$

### Network Parameters & Dynamics
Given a fully connected network of $N$ neurons,<br>
$\text{x}$ : An $N$-dimensional input vector (input signal to the $N$ neurons)<br>
$\text{y}$ : An $N$-dimensional output vector (output signal from the $N$ neurons)<br>
$\text{W}$ : An $N \times N$ weight matrix (synaptic connection strengths between neurons)<br>
$\text{b}$ : An $N$-dimensional bias vector (threshold for activation of neurons)<br>

The state of a neuron at any stage is given by:
$$
\text{y}=\text{sign}(\text{W}^{T}\text{x}+\text{b})
$$

We use a slightly modified signum function:
$$
\text{sign}(f(\text{z}^{(t)}))=
\begin{cases}
  1 & \text{if } f(\text{z}^{(t-1)})>0 \\
  -1 & \text{if } f(\text{z}^{(t-1)})<0 \\
  \text{z}^{(t-1)} & \text{if } f(\text{z}^{(t-1)})=0
\end{cases}
$$

where $f(\text{z})$ must be a linear transformation of $\text{z}$, and $\text{z}^{(t)}$ denotes the state of the neuron at time $t$.

### Energy of the Network

Energy of an HNN is given by:
$$
\begin{align*}
E &= -\frac{1}{2} \left( \text{x}^{T}\text{W}\text{x}+\text{b}^{T}\text{x} \right) \\
  &= -\frac{1}{2}\left(\sum_{i=1}^{N}\sum_{j=1}^{N}w_{ij}x_{i}x_{j}+\sum_{i=1}^{N}b_{i}x_{i}\right)
\end{align*}
$$

For a **learning type problem** like pattern recognition:
* We are given the training data in form of multiple sets of input vectors $\text{x}$ and output vectors $\text{y}$.
* The goal is to come up with a good model $(\text{W}, \text{b})$ such that the predictions made with this model match closely with those of real prediction data.

For an **optimization type problem** (in graphs):
* $\text{W}$ and $\text{b}$ can be obtained by translating the objective (+constraints) of the problem at hand into the energy function of the network defined above.
* Given the edge weights and nodes $(\text{W}, \text{b})$, the goal is to find the optimal solution i.e. an input vector $\text{x}$ for which the HNN energy $E(\text{x})$ is globally minimized.

> [!NOTE]
> Realizing the dual nature between the above two problem types, can we say anything about the computational complexity of the former if we know the complexity of the latter?

### Natural Energy Minimization in HNN

Consider an update made to the $i^{th}$ neuron.
$$
y_{i}=\text{sign} \left( \left( \sum_{j=1}^{n}w_{ij}x_{j} \right) + b_{i} \right)
$$

The energy change in the network due to the above single change is:
$$
\begin{align*}
\Delta E &= E^{f}-E^{i}=E_{i}^{f}-E_{i}^{i} \\
         &=-\frac{1}{2} \left[ \sum_{j=1}^{N}w_{ij}(y_{i}-x_{i})x_{j}+b_{i}(y_{i}-x_{i}) \right] \\
         &=-\frac{1}{2}(y_{i}-x_{i}) \left[ \sum_{j=1}^{N}w_{ij}x_{j}+b_{i} \right]
\end{align*}
$$

This is true under the important assumption that $w_{ii}=0\ \forall\ i\in\{1,...,N\}$.

Note that the sign of $\sum_{j=1}^{N}w_{ij}x_{j}+b_{i}$ is exactly the output at the $i^{th}$ neuron, $y_{i}$.

Now,
$$
\sum_{j=1}^{N}w_{ij}x_{j}+b_{i}>0 \quad\Rightarrow\quad y_{i}=1 \quad\Rightarrow\quad y_{i}\ge x_{i} \quad\Rightarrow\quad \Delta E\le0
$$
Similarly,
$$
\sum_{j=1}^{N}w_{ij}x_{j}+b_{i}<0 \quad\Rightarrow\quad y_{i}=-1 \quad\Rightarrow\quad y_{i}\le x_{i} \quad\Rightarrow\quad \Delta E\le0
$$
and
$$
\sum_{j=1}^{N}w_{ij}x_{j}+b_{i}=0 \quad\Rightarrow\quad y_{i}=x_{i} \quad\Rightarrow\quad \Delta E=0
$$

Thus, we always have $\Delta E\le0$

**A few things to note:**
* We assumed zero diagonal weights for $\text{W}$. If we relax this assumption, there will be an upper limit to the magnitude of $w_{ii}$, i.e., $|w_{ii}|<k~\text{max}_{i\ne j}(|w_{ij}|)$.
* We update only one neuron at a time. This is called the **synchronous** approach. For the **asynchronous** case, multiple neurons can be updated in a batch of say $k$ selected neurons ($k$ can be equal to $N$). Depending on the weight matrix $\text{W}$, this, this may or may not converge to the expected solution.
* Any QUBO problem can be mapped to a unique HNN.
* The network is updated for a series of $n_{s}$ steps to allow the energy to go down such that the corresponding final output vector $\text{y}$ can be obtained.
* The whole update procedure is run for $n_{e}$ epochs, and every epoch starts with a randomly initialized input vector $\text{x}$.
* Although the epoch for which the final energy is minimum is considered as the result. Most update paths may not converge to this solution, in which case, the energy that most epochs converge to can be considered a local minima.

---
# Annealing Techniques

### Overview
Annealing techniques are ways to modify the problem landscape, that the neural network maps to, by introducing external parameters (like temperature, annealing time, etc.), in real time as the network searches for a solution.

Depending on the starting conditions and how the network evolves by gradually varying these external parameters, such techniques can increase the probabilities of reaching to a solution thus helping the network arrive at a solution faster than employing it naively to solve the problem.

### Stochastic Simulated Annealing

Consider the following update mechanism for the $i^{th}$ neuron:
$$
y_{i}=
\begin{cases}
  1 & \text{with probability } \quad p_{i}^{T}\left(\sum_{j}w_{ij}x_{j}+b_{i}\right) \\
  -1 & \text{with probability } \quad 1-p_{i}^{T}\left(\sum_{j}w_{ij}x_{j}+b_{i}\right)
\end{cases}
$$
where $p_{i}^{T}$ is the probability distribution which in this case is taken to be a signum function from $0$ to $1$, centered at $\frac{1}{2}$. For a given input $x_{i}$, the closer $p_{i}$ is to $1$, the higher the chances of getting an output $1$. On the other hand, the closer it is to $0$, the higher the chances of the state of the neuron being updated to $-1$. $T$ in superscript denotes the dependence on **temperature**.
$$
p_{i}^{T}(z)=\frac{1}{1+\text{exp}(-z/T)}
$$

### Weight Annealing

In combinatorial optimization, to maximize/minimize an objective function, it is common to only vary the binary variables by trial and error following some annealing technique. Although the weight matrix (and bias) is fixed for a problem, we don't necessarily have to start with those values. In weight annealing, we start with an easy problem, say a constant weight matrix (and bias), and gradually move towards that of our required problem.

In the initial stages, the HNN would automatically converge to the lowest energy solution for the modified (easier) problem, since there won't be any possibility of getting stuck in a local minima. Weight annealing relies on the idea that if the lowest energy solution for the previous iterations has been achieved, it is highly likely that the network will stay in the lowest energy for the current problem as well, as long as the weights in the network are changed gradually.

We often have a parameter called **annealing time ($\tau$)**, that controls how slow the whole process of changing the weights from constant values to the required values is done. This idea of gradual change in the network weights might be inspired by quantum annealing.


Some weight annealing approaches:

* **Exponential Annealing**
$$
\begin{array}{l c r r}
d_{\alpha}(i,j) = d\cdot(1-\exp(-1/\alpha)) &\qquad &\alpha : \infty \rightarrow 0 & \\
\end{array}
$$
* **Linear (Semi-exponential) Annealing**
$$
\begin{array}{l c r r}
d_{\alpha} = d\cdot \alpha &\qquad &\alpha : 0 \rightarrow 1 & \\
\end{array}
$$
* **Exponential Smoothing [^1]**
$$
\begin{array}{l c r r}
d_{\alpha}(i,j) =
  \begin{cases}
    \overline{d} + \frac{\alpha}{\exp\left(\frac{\alpha}{d(i,j)-\overline{d}}\right) - 1} & \text{if } d(i,j) \ge \overline{d} \\
    \overline{d} - \frac{\alpha}{\exp\left(\frac{\alpha}{\overline{d}-d(i,j)}\right) - 1} & \text{if } d(i,j) < \overline{d}
  \end{cases} &\qquad &\alpha : \infty \rightarrow 0 & \\
\end{array}
$$
$\qquad$where $d_{\alpha \rightarrow 0}(i,j) = d(i,j)$ and $d_{\alpha \rightarrow \infty}(i,j) = \overline{d}$.
<!-- $$
\begin{align*}
\alpha \rightarrow 0      &\quad \Rightarrow \quad d_{\alpha}(i,j) \rightarrow d(i,j) \\
\alpha \rightarrow \infty &\quad \Rightarrow \quad d_{\alpha}(i,j) \rightarrow \overline{d}
\end{align*}
$$ -->
* **Power Smoothing [^1]**
$$
\begin{array}{l c r r}
d_{\alpha}(i,j) =
  \begin{cases}
    (d-\overline{d})^{\alpha}  & \text{if } d(i,j) \ge \overline{d} \\
    -(d-\overline{d})^{\alpha} & \text{if } d(i,j)  <  \overline{d}
  \end{cases} &\qquad &\alpha : 0 \rightarrow 1 & \\
\end{array}
$$

$d$ here denotes the overall augmented weight matrix $\left[\text{W|b}\right]$ of the network.

### Quantum Annealing or Quantum Adiabatic Optimization [^2]

Suppose we have a **Quantum Hamiltonian** $H_{P}$ whose ground state encodes the solution to a problem of interest, and another Hamiltonian $H_{0}$, whose ground state is "easy" (both to find and to prepare in an experimental setup). Then, if we prepare a quantum system to be in the ground state of $H_{0}$, and then adiabatically change the Hamiltonian for a time $\tau$ according to
$$
H(t)=(1-\frac{t}{\tau})H_{0}+\frac{t}{\tau}H_{P}
$$
if $\tau$ is large enough, and $H_{0}$ and $H_{P}$ do not commute, the quantum system will remain in the ground state for all times, by the adiabatic theorem of quantum mechanics. At time $\tau$, measuring the quantum state will return a solution to our problem.

### Hybrid Approach

A combined approach involving simultaneous weight as well as stochastic annealing was employed in this work.

---
# Problem Solving

Through an implementation of a Hopfield Neural Network, the goal is to solve certain **NP-Hard/NP-Complete problems** in combinatorial optimization such as Maximum Cut, Maximum Clique, Minimum Vertex Cover, Maximum Independent Set. The energy functions for each of the problems below are to be minimized.

* **Max-Weighted-Cut**
$$
\text{min}\left[ \frac{1}{4}\left( 1^T\text{W}1-\text{x}^T\text{W}\text{x} \right) \right]
$$
* **Max-Weighted-Clique**
$$
\text{min}\left[ \frac{1}{8}\left( (\text{x}+1)^T(\text{W}1-\text{b}) - (\text{x}+1)^T\text{W}(\text{x}+1) \right) \right]
$$
* **Min-Weighted-Vertex-Cover**
$$
\text{min}\left[ -\frac{1}{8}\left( (\text{x}+1)^T(\text{W}1+\text{b}) + (\text{x}-1)^T\text{W}(\text{x}-1) \right) \right]
$$
* **Max-Weighted-Independent-Set**
$$
\text{min}\left[ \frac{1}{8}\left( (\text{x}+1)^T(\text{W}1-\text{b}) - (\text{x}+1)^T\text{W}(\text{x}+1) \right) \right]
$$

## Results

The following is a subset of results obtained from an implementation of the Hopfield Neural Network with respective annealing techniques in the context of solving the Max-Cut problem.

Source of Max-Cut data: [biqbin.eu/MaxCut](http://biqbin.eu/Home/Benchmarks)

### Baseline

| dataset      | optimal (or approx.) solution energy | obtained solution energy | time to solution (s) |
|:------------ |:------------------------------------:|:------------------------:|:--------------------:|
| mc_21_199    |                 109                  |           109            |        3.13          |
| mc_50_156    |                1762                  |          1762            |        3.80          |
| mc_63_1729   |                 956                  |           956            |        4.62          |
| mc_100_242   |                 197                  |           197            |        5.00          |
| mc_101_5006  |                4322                  |          4322            |        4.87          |
| mc_800_4667  |                3044                  |          2786            |      170.13          |
<br>

### Stochastic Annealing

| dataset      | optimal (or approx.) solution energy | obtained solution energy | time to solution (s) |
|:------------ |:------------------------------------:|:------------------------:|:--------------------:|
| mc_21_199    |                 109                  |           109            |        12.89         |
| mc_50_156    |                1762                  |          1762            |        13.56         |
| mc_63_1729   |                 956                  |           956            |        13.51         |
| mc_100_242   |                 197                  |           197            |        15.72         |
| mc_101_5006  |                4322                  |          4322            |        14.87         |
| mc_800_4667  |                3044                  |          2786*           |       346.11         |
<br>

### Exponential Annealing

| dataset      | optimal (or approx.) solution energy | obtained solution energy | time to solution (s) |
|:------------ |:------------------------------------:|:------------------------:|:--------------------:|
| mc_21_199    |                 109                  |           109            |         4.25         |
| mc_50_156    |                1762                  |          1762            |         9.98         |
| mc_63_1729   |                 956                  |           956            |        10.97         |
| mc_100_242   |                 197                  |           197            |        13.12         |
| mc_101_5006  |                4322                  |          4322            |        12.69         |
| mc_800_4667  |                3044                  |          2881*           |       357.67         |

\* denotes a higher number of steps applied because of the large dataset.<br>
For more details on the simulations and results, refer to the [GitHub repository](https://github.com/AsishMandoi/mem-HNNs).

---
## Future Scope
1. **Using negative diagonal weights in the Hopfield network**
2.  **Operating HNN near the critical point**
    * Critical point - the edge between order and disorder
    * Critical phenomena occurs at a lot of interesting places:
        * phase change
        * spins in lattices
        * brain
    * Critical dynamics are best demonstrated in a simplified system known as the Ising model.

3.  **Neural Networks: Identifying the Dual Nature of learning and solving**

> [!IMPORTANT]
> ### Appendix: Limits of using negative diagonal weights [^3]
> **Diagonal Weights:** A common misconception in the literature is that zero diagonals of the weight matrix ($W_{ii}=0$) are necessary for the stable states of the continuous model to coincide with those of the original discrete model. This belief has no doubt evolved due to Hopfield's original simplifying assumption that $W_{ii}=0$. In fact, there are no restrictive conditions on the diagonals of W for the continuous model to converge to a minimum of $E_{c}$. If $W_{ii}<0$ however, that minimum may lie in the interior of the hypercube, due to the convexity of the energy function. In this case, annealing techniques are usually employed to drive the solution trace towards the vertices.
> 
> Unlike the continuous model however, non-zero diagonal elements of the discrete Hopfield network do not necessarily allow Liapunov descent to local minima of $E_{d}$. This is because the change in energy $E_{d}$ due to a change in output level $v_{i}$ is:
> $$
> \Delta E_{d}=-(u_{i}\Delta v_{i})-\frac{1}{2}W_{ii}(\Delta v_{i})^{2}
> $$
> Since $u_{i}\ge0$ results in $\Delta v_{i}\ge0$, and $u_{i}<0$ results in $\Delta v_{i}\le0$ under the discrete model, the first term on the right-hand side of the above equation is always negative. The second term is positive however for $W_{ii}<0$. Consequently, $\Delta E_{d}$ is only negative provided
> $$
> ||\Delta v_{i}||\le2\frac{||u_{i}||}{||W_{ii}||}
> $$

[^1]: J. Schneider et al., "Search-space smoothing for combinatorial optimization problems", Physica A, 243, pp. 77-112, 1997.
[^2]: L. Andrew, "Ising formulations of many NP problems", Front. Phys., Vol. 2, 2014.
[^3]: J. Y. Potvin and K. A. Smith, "Artificial Neural Networks for Combinatorial Optimization," in F. Glover, G.A. Kochenberger (eds) Handbook of Metaheuristics in International Series in Operations Research and Management Science, Kluwer Academic Publishers. International Series in Operations Research & Management Science, vol 57. Springer, Boston, MA., 2003, Ch. 15, pp. 429-455, Kluwer Academic Publishers, 2003.
[^4]: M. R. Mahmoodi et al., "Versatile stochastic dot product circuits based on nonvolatile memories for high performance neurocomputing and neurooptimization", 2019.
[^5]: Z. Fahimi et al., "Combinatorial Optimization by Weight Annealing in Memristive Hopfield Networks", 2021.
