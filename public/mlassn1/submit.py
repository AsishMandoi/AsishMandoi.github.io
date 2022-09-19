import numpy as np
# This is the only scipy method you are allowed to use
# Use of scipy is not allowed otherwise
from scipy.linalg import khatri_rao
import random as rnd
import time as tm

# For plotting purposes
import matplotlib as mpl
import matplotlib.pyplot as plt
mpl.style.use('seaborn')

# SUBMIT YOUR CODE AS A SINGLE PYTHON (.PY) FILE INSIDE A ZIP ARCHIVE
# THE NAME OF THE PYTHON FILE MUST BE submit.py
# DO NOT INCLUDE PACKAGES LIKE SKLEARN, SCIPY, KERAS ETC IN YOUR CODE
# THE USE OF ANY MACHINE LEARNING LIBRARIES FOR WHATEVER REASON WILL RESULT IN A STRAIGHT ZERO
# THIS IS BECAUSE THESE PACKAGES CONTAIN SOLVERS WHICH MAKE THIS ASSIGNMENT TRIVIAL
# THE ONLY EXCEPTION TO THIS IS THE USE OF THE KHATRI-RAO PRODUCT METHOD FROM THE SCIPY LIBRARY
# HOWEVER, NOTE THAT NO OTHER SCIPY METHOD MAY BE USED IN YOUR CODE

# DO NOT CHANGE THE NAME OF THE METHODS solver, get_features, get_renamed_labels BELOW
# THESE WILL BE INVOKED BY THE EVALUATION SCRIPT. CHANGING THESE NAMES WILL CAUSE EVALUATION FAILURE

# You may define any new functions, variables, classes here
# For example, functions to calculate next coordinate or step length

C = 1
eta = 0.5
bSize = 10000
setModelAveraging = True
updMethod = "MBSPGD"
W_run_list = []	# List of running W vectors for model averaging and plotting purposes
time_list	= []	# List of running times for plotting purposes
objValSeq	= []	# List of running objective values for plotting purposes

class CSVM:
	def __init__(self, X, y, C = 1, eta = 0.5, B = 256, updateMethod = "MBSPGD", stepMode = "quadratic", coordSelectMode = "randperm" ):
		(self.n, self.d) = X.shape
		self.X = X
		self.y = y
		self.C = C
		self.eta = eta
		self.B = min(B, self.n)
		self.updateMethod = updateMethod
		self.stepMode = stepMode
		self.coordSelectMode = coordSelectMode

		if updateMethod in [ "PGD", "SPGD", "MBSPGD" ]: self.isDual = False
		elif updateMethod in [ "SDCM" ]: self.isDual = True
		else: raise ValueError("No such method: %r" % updateMethod)
		
		if stepMode not in [ "constant", "linear", "quadratic" ]:
			raise ValueError("No such step mode: %r" % stepMode)
		
		if coordSelectMode not in [ "randperm", "cyclic", "random" ]:
			raise ValueError("No such coordinate selection mode: %r" % coordSelectMode)
		
		self.XNormSq = np.square( np.linalg.norm( X, axis = 1 ) )
		self.currCoordState = -1
		self.currCoordIdx = -1

	def update(self, w, alpha, t):
		'''Get the function corresponding to the chosen optimization method'''
		getUpdateFunc = {
			"PGD": self.PGD(w, t),
			"SPGD": self.SPGD(w, t),
			"MBSPGD": self.MBSPGD(w, t),
			"SDCM": self.SDCM(w, alpha, t)
		}
		return getUpdateFunc[ self.updateMethod ]
	
	def step(self, t):
		'''Get the step function / learning rate corresponding to the chosen step mode'''
		getStepFunc = {
			"constant": self.eta,
			"linear": self.eta/(t+1),
			"quadratic": self.eta/np.sqrt(t+1)
		}
		return getStepFunc[ self.stepMode ]

	def selectCoord(self, beg, end):
		'''Select the coordinate to update'''
		getNextState = {
			"cyclic": self.nextCyclicState(beg, end),
			"randperm": self.nextPermState(beg, end),
			"random": self.nextRandState(beg, end)
		}
		return getNextState[ self.coordSelectMode ]
	
	def PGD( self, w, t ):
		'''Primal Gradient Descent'''
		g = np.zeros( (self.n,) )
		g[self.y * self.X.dot( w ) < 1] = -1
		gradw = w + self.C * (self.X.T * g).dot( self.y )
		w = w - self.step(t) * gradw
		return w, None

	def SPGD( self, w, t ):
		'''Stochastic Primal Gradient Descent'''
		i = np.random.randint( self.n )
		g_i = -1 if self.y[i] * self.X[i,:].dot( w ) < 1 else 0
		gradw = w + self.C * self.n * (self.X[i,:].T * g_i) * self.y[i]
		w = w - self.step(t) * gradw
		return w, None

	def MBSPGD( self, w, t ):
		'''Mini-Batch Stochastic Primal Gradient Descent'''
		samples = rnd.sample( range(0, self.n), self.B )
		X_ = self.X[samples,:]
		y_ = self.y[samples]
		g = np.zeros( (self.B,) )
		g[y_ * (X_.dot( w )) < 1] = -1
		gradw = w + self.C * self.n/self.B * (X_.T * g).dot( y_ )
		w = w - self.step(t) * gradw
		return w, None
	
	def SDCM(self, w, alpha, t ):
		'''Stochastic Dual Coordinate Maximization'''
		self.isDual = True
		i = self.selectCoord(0, self.d)
		newAlphai = alpha[i] * self.y[i] + (1 - self.X[i,:].dot(w)) / self.XNormSq[i]

		if newAlphai > self.C:
				newAlphai = self.C
		if newAlphai < 0:
				newAlphai = 0
		
		w = w + (newAlphai - alpha[i]) * self.y[i] * self.X[i,:]
		alpha[i] = newAlphai
		return w, alpha

	def getObjVal(self, w, alpha ):
		'''Get the primal/dual objective value'''
		if self.isDual:
			return np.sum( alpha ) - 0.5 * w.dot( w )
		else:
			hingeLoss = np.maximum( 1 - self.y * self.X.dot( w ), 0 )
			return 0.5 * w.dot( w ) + self.C * np.sum( hingeLoss )
	
	def nextCyclicState(self, l, r):
		'''Get the next cyclic state from [l, r)'''
		self.currCoordState = l + (self.currCoordState + 1) % (r - l)
		return self.currCoordState
	
	def nextPermState(self, l, r):
		'''Get the next state from a random permutation of states from [l, r)'''
		self.currCoordIdx = (self.currCoordIdx + 1) % (r - l)
		if self.currCoordIdx == 0:
			self.currPerm = np.random.permutation(np.arange(l, r))
		return self.currPerm[self.currCoordIdx]
	
	def nextRandState(self, l, r):
		'''Get the next cyclic state from [l, r)'''
		return l + np.random.randint(r - l)


################################
# Non Editable Region Starting #
################################
def get_renamed_labels( y ):
################################
#  Non Editable Region Ending  #
################################

	# Since the dataset contain 0/1 labels and SVMs prefer -1/+1 labels,
	# Decide here how you want to rename the labels
	# For example, you may map 1 -> 1 and 0 -> -1 or else you may want to go with 1 -> -1 and 0 -> 1
	# Use whatever convention you seem fit but use the same mapping throughout your code
	# If you use one mapping for train and another for test, you will get poor accuracy
	y_new = 2 * y - 1
	return y_new.reshape( ( y_new.size, ) )					# Reshape y_new as a vector

################################
# Non Editable Region Starting #
################################
def get_features( X ):
################################
#  Non Editable Region Ending  #
################################

	# Use this function to transform your input features (that are 0/1 valued)
	# into new features that can be fed into a linear model to solve the problem
	# Your new features may have a different dimensionality than the input features
	# For example, in this application, X will be 8 dimensional but your new
	# features can be 2 dimensional, 10 dimensional, 1000 dimensional, 123456 dimensional etc
	# Keep in mind that the more dimensions you use, the slower will be your solver too
	# so use only as many dimensions as are absolutely required to solve the problem
	X_new = np.cumprod( np.flip( 2 * X - 1 , axis = 1 ), axis = 1 )
	X_new = np.append( X_new, np.ones( np.array(X_new).shape[0] ).reshape(-1, 1), axis=1 )
	(n, d) = X_new.shape
	
	# Assuming number of PUFs = 3
	# Optimizing the number of features instead of naively using all of them, however if the number
	# of features is greater this method might be too slow
	if d <= 128:
		visited = np.zeros((d, d, d), dtype=bool)
		for i in range( 0, d ):
			for j in range( i+1, d ):
				for k in range( j+1, d ):
					if visited[i, j, k] == False:
						X_new = np.append( X_new, (X_new[:,i] * X_new[:,j] * X_new[:,k]).reshape(n, -1), axis=1 )
						visited[i, j, k] = True
						visited[i, k, j] = True
						visited[j, i, k] = True
						visited[j, k, i] = True
						visited[k, i, j] = True
						visited[k, j, i] = True
	else:
		X_tmp = khatri_rao( X_new.T, X_new.T )
		X_new = khatri_rao( X_tmp, X_new.T ).T
	return X_new

def solver( X, y, timeout, spacing ):
	(n, d) = X.shape
	t = 0
	totTime = 0
	
	# W is the model vector and will get returned once timeout happens
	# B is the bias term that will get returned once timeout happens
	# The bias term is optional. If you feel you do not need a bias term at all, just keep it set to 0
	# However, if you do end up using a bias term, you are allowed to internally use a model vector
	# that hides the bias inside the model vector e.g. by defining a new variable such as
	# W_extended = np.concatenate( ( W, [B] ) )
	# However, you must maintain W and B variables separately as well so that they can get
	# returned when timeout happens. Take care to update W, B whenever you update your W_extended
	# variable otherwise you will get wrong results.
	# Also note that the dimensionality of W may be larger or smaller than 9
	
	W = []
	B = 0
	tic = tm.perf_counter()
################################
#  Non Editable Region Ending  #
################################

	# You may reinitialize W, B to your liking here e.g. set W to its correct dimensionality
	# You may also define new variables here e.g. step_length, mini-batch size etc

	global W_run_list, time_list, objValSeq

	X = get_features( X )
	y = get_renamed_labels( y )
	model = CSVM( X, y, C, eta, bSize, updateMethod=updMethod )
	
	alpha = C * np.ones( (n,) )
	W_run = C * X.T.dot( y )	# running weights
	W_run_list = [ W_run ]
	time_list = []
	objValSeq = [ model.getObjVal( W_run, alpha ) ]
	W = W_run	# choosing not to use the bias term

################################
# Non Editable Region Starting #
################################
	while True:
		t = t + 1
		if t % spacing == 0:
			toc = tm.perf_counter()
			totTime = totTime + (toc - tic)
			if totTime > timeout:
				return ( W.reshape( ( W.size, ) ), B, totTime )			# Reshape W as a vector
			else:
				tic = tm.perf_counter()
################################
#  Non Editable Region Ending  #
################################

		# Write all code to perform your method updates here within the infinite while loop
		# The infinite loop will terminate once timeout is reached
		# Do not try to bypass the timer check e.g. by using continue
		# It is very easy for us to detect such bypasses which will be strictly penalized
		
		# Note that most likely, you should be using get_features( X ) and get_renamed_labels( y )
		# in this part of the code instead of X and y -- please take care
		
		# Please note that once timeout is reached, the code will simply return W, B
		# Thus, if you wish to return the average model (as is sometimes done for GD),
		# you need to make sure that W, B store the averages at all times
		# One way to do so is to define a "running" variable w_run, b_run
		# Make all GD updates to W_run e.g. W_run = W_run - step * delW (similarly for B_run)
		# Then use a running average formula to update W (similarly for B)
		# W = (W * (t-1) + W_run)/t
		# This way, W, B will always store the averages and can be returned at any time
		# In this scheme, W, B play the role of the "cumulative" variables in the course module optLib (see the cs771 library)
		# W_run, B_run on the other hand, play the role of the "theta" variable in the course module optLib (see the cs771 library)
		
		updValues = model.update( W_run, alpha, t )
		W_run = updValues[0]
		if updValues[1] is not None: alpha = updValues[1]
		W_run_list.append( W_run )
		time_list.append( totTime )

		if setModelAveraging:
			W = (W * (t-1) + W_run)/t
			objValSeq.append( model.getObjVal( alpha, W ) )
		else:
			W = W_run
			objValSeq.append( model.getObjVal( alpha, W_run ) )

	return ( W.reshape( ( W.size, ) ), B, totTime )			# This return statement will never be reached

def plot_accuracy_vs_time(X_trn, y_trn, X_tst, y_tst, t=10):
	'''Plot test and train accuracy vs time for the predictions in every iteration in the training process'''
	
	global W_run_list, time_list, objValSeq
	( fin_w, fin_b, fin_time ) = solver( X_trn, y_trn, t, 1 )
	time_list.append( fin_time )

	W_run_list = np.array( W_run_list )
	time_list = np.array( time_list )
	objValSeq = np.array( objValSeq )

	# Training accuracy
	y_pred_trn = np.sign( 2 * ( W_run_list.dot( get_features( X_trn ).T ) >= 0 ) - 1 )
	diff_trn = y_pred_trn - get_renamed_labels( y_trn )
	trn_acc_list = np.average( np.array(diff_trn==0, dtype=float), axis = 1 )

	# Testing accuracy
	y_pred_tst = np.sign( 2 * ( W_run_list.dot( get_features( X_tst ).T ) >= 0 ) - 1 )
	diff_tst = y_pred_tst - get_renamed_labels(y_tst)
	tst_acc_list = np.average( np.array(diff_tst==0, dtype=float), axis = 1 )

	print(time_list.shape)

	plt.plot( time_list, tst_acc_list )
	# plt.plot( time_list, trn_acc_list, label = "Train Accuracy" )
	# plt.plot( time_list, trn_acc_list-tst_acc_list, label = "Accuracy Difference" )
	plt.xlabel( "Elapsed time (sec)" )
	plt.ylabel( "Test Accuracy" )
	plt.legend()
	plt.show()
